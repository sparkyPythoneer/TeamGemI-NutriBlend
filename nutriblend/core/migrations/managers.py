from pyotp.totp import TOTP

from django.contrib.auth.hashers import make_password
from django.conf import settings
from django.db import models

from helpers.reusable import convert_string_to_base32


# Create your manager(s) here.
class OTPManager(models.Manager):
    """
    Handles OTP generation.
    OTP is unique per user as the user identifier is used as secret.
    """
    SECRET = settings.OTP_SECRET

    def create_otp(
        self,
        type: str,
        recipient: str,
        length: int,
        expiry_time: int
    ):
        """
        Create a One-Time Password (OTP) and store it in the database.
        Args:
            type (str): The type of OTP being generated, e.g., "email" or "phone".
            recipient (str): The recipient's identifier for whom the OTP is being generated.
            length (int): The length of the OTP to be generated.
            expiry_time (int): The validity time of the OTP in seconds.
        Returns:
            str: The generated OTP code as a string.
        Raises:
            None
        """
        code_generator = TOTP(
            convert_string_to_base32(f"{self.SECRET};{recipient}"),
            digits=length
        )
        code_value = code_generator.now()

        otp = self.model(
            type=type,
            recipient=recipient,
            length=length,
            expiry_time=expiry_time,
            code=make_password(code_value)
        )
        otp.save()
        return code_value