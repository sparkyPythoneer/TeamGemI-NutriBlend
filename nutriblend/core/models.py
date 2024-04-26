import pytz
import uuid
from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.db import models
from django.utils.translation import gettext as _

from .managers import OTPManager


# Create your model(s) here.
class BaseModel(models.Model):
    """Base model for reuse.
    Args:
        models (Model): Django's model class.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(_('date created'), auto_now_add=True)
    updated_at = models.DateTimeField(_('date updated'), auto_now=True)

    class Meta:
        abstract = True


class OTP(BaseModel):
    """
    Model representing a One-Time Password (OTP).
    Attributes:
        type (str): The type of the OTP (e.g., "registration", "password-reset", etc.).
        recipient (str): The recipient's identifier (e.g., email address, phone number).
        length (int): The length of the OTP code.
        expiry_time (int): The validity period of the OTP in seconds.
        code (str): The generated OTP code.
        is_used (bool): Flag indicating whether the OTP has been used or not.
    Relationships:
        objects (OTPManager): Custom manager for OTP objects.
    """
    type = models.CharField(max_length=255)
    recipient = models.CharField(max_length=255)
    length = models.IntegerField()
    expiry_time = models.IntegerField()
    code = models.CharField(max_length=255)
    is_used = models.BooleanField(default=False)

    objects = OTPManager()

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "ONE TIME PASSWORD"
        verbose_name_plural = "ONE TIME PASSWORDS"

    def __str__(self) -> str:
        return f"{self.type} OTP sent to {self.recipient}"

    @property
    def time_valid(self):
        """
        Property that checks if the object's created time is still within the valid time range.
        Returns:
            bool: True if the object's created time is within the valid time range, False otherwise.
        """
        current_time = datetime.now(tz=pytz.timezone(settings.TIME_ZONE))
        return True if self.created_at > current_time - timedelta(minutes=self.expiry_time) else False

    @classmethod
    def get_otp(
        cls,
        type: str,
        recipient: str,
        length: int = 6,
        expiry_time: int = 5
    ):
        """
        Generate and retrieve a new OTP (One-Time Password) object.
        Args:
            type (str): The type of the OTP.
            recipient (str): The recipient of the OTP.
            length (int, optional): The length of the OTP. Defaults to 6.
            expiry_time (int, optional): The expiry time of the OTP in minutes. Defaults to 5.
        Returns:
            OTP: The newly created OTP object.
        """
        otp = cls.objects.create_otp(
            type=type,
            recipient=recipient,
            length=length,
            expiry_time=expiry_time
        )
        return otp

    @classmethod
    def verify_otp(cls, recipient: str, otp: str) -> dict:
        """
        Verify the OTP (One-Time Password) for the given recipient.
        Args:
            recipient (str): The recipient for whom to verify the OTP.
            otp (str): The OTP to be verified.
        Returns:
            dict: A dictionary containing the verification status and message.
                - If the OTP is valid and not expired, the status will be True and the message will be "OTP is valid for recipient."
                - If the OTP is invalid or expired, the status will be False and the message will be "invalid or expired OTP."
                - If no valid OTP is found for the recipient, the status will be False and the message will be "invalid or expired OTP."
        """
        one_time_password = cls.objects.filter(
            recipient=recipient, is_used=False).first()
        if one_time_password is not None:
            if one_time_password.time_valid:
                verified = check_password(otp, one_time_password.code)
                if verified:
                    one_time_password.is_used = True
                    one_time_password.save()
                    return {"status": True, "message": "OTP is valid for recipient."}
                return {"status": False, "message": "invalid or expired OTP."}
            return {"status": False, "message": "invalid or expired OTP."}
        return {"status": False, "message": "invalid or expired OTP."}