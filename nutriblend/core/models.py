from datetime import datetime, timedelta
from typing import Optional
import uuid

from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.db import models
from django.utils.translation import gettext as _
import pytz

from core.managers import OTPManager


# Create your model(s) here.
class BaseModel(models.Model):
    """Base model for reuse.
    Args:
        models (Model): Django's model class.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(_("date created"), auto_now_add=True)
    updated_at = models.DateTimeField(_("date updated"), auto_now=True)

    class Meta:
        abstract = True


class OTP(BaseModel):
    """
    Model representing a One-Time Password (OTP).
    Relationships:
        objects (OTPManager): Custom manager for OTP objects.
    """

    type = models.CharField(
        max_length=255,
        help_text="The type of OTP being generated, e.g.,'REGISTRATION', e.t.c.",
    )
    recipient = models.CharField(
        max_length=255,
        help_text="The recipient's identifier for whom the OTP is being generated.",
    )
    length = models.IntegerField(
        default=8, help_text="The length of the OTP to be generated (max=10)."
    )
    expiry_time = models.IntegerField(
        default=10, help_text="The validity time of the OTP in minutes (default=10)."
    )
    code = models.CharField(max_length=255, editable=False)
    is_used = models.BooleanField(default=False)

    objects = OTPManager()

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "ONE TIME PASSWORD"
        verbose_name_plural = "ONE TIME PASSWORDS"

    def __str__(self) -> str:
        return f"{self.type} OTP sent to {self.recipient}"

    @property
    def time_valid(self) -> bool:
        """
        Property that checks if the object's created time is still within the valid time range.
        Returns:
            bool: True if the object's created time is within the valid time range, False otherwise.
        """
        current_time = datetime.now(tz=pytz.timezone(settings.TIME_ZONE))
        return (
            True
            if (current_time - self.created_at) <= timedelta(minutes=self.expiry_time)
            else False
        )

    @classmethod
    def get_otp(
        cls,
        type: str,
        recipient: str,
        length: Optional[int] = 8,
        expiry_time: Optional[int] = 10,
    ) -> str:
        """
        Generate and retrieve a new OTP (One-Time Password) object.
        Returns:
            OTP: The newly created OTP object.
        """
        otp = cls.objects.create_otp(
            type=type, recipient=recipient, length=length, expiry_time=expiry_time
        )
        return otp

    @classmethod
    def verify_otp(cls, recipient: str, otp: str) -> dict:
        """
        Verify the OTP (One-Time Password) for the given recipient.
        Returns:
            dict:
            - a dictionary containing the verification status and message.
        """
        one_time_password = cls.objects.filter(
            recipient=recipient, is_used=False
        ).first()
        if one_time_password is None:
            return {"status": False, "message": "invalid or expired OTP."}
        else:
            if not one_time_password.time_valid:
                return {"status": False, "message": "invalid or expired OTP."}
            else:
                verified = check_password(otp, one_time_password.code)
                if not verified:
                    return {"status": False, "message": "invalid or expired OTP."}
                else:
                    one_time_password.is_used = True
                    one_time_password.save()
                    return {"status": True, "message": "OTP is valid for recipient."}
