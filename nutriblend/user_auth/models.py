from datetime import datetime
from typing import Optional

from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
import pytz
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import BaseModel, OTP
from helpers.reusable import validate_password
from helpers.sms_handler import send_otp
from user_auth.managers import UserManager


# Create your model(s) here.
class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    """
    Custom user model representing a user profile.
    """

    TYPE_OF_USER = (
        ("NB_USER", "NB_USER"),
        ("CHEF", "CHEF"),
    )
    first_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255)
    user_type = models.CharField(
        max_length=255, choices=TYPE_OF_USER, default="NB_USER"
    )
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=25, default="2340123456789")
    user_verified = models.BooleanField(default=False)
    password = models.CharField(
        max_length=255, validators=[validate_password], editable=False
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "USER PROFILE"
        verbose_name_plural = "USER PROFILES"

    def __str__(self) -> str:
        return self.email

    def get_fullname(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @classmethod
    def sign_up(
        cls,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        phone: str,
        user_type : str,
        middle_name: Optional[str] = None,
    ) -> bool:
        """ """
        user = cls.objects.create_user(
            first_name=first_name.capitalize(),
            middle_name=(
                middle_name.capitalize() if middle_name is not None else middle_name
            ),
            last_name=last_name.capitalize(),
            email=email,
            password=password,
            user_type=user_type,
            phone=phone,
        )
        otp = OTP.get_otp(type="REGISTRATION", recipient=phone)
        send_otp(recipient=phone, code=otp)
        return user

    @classmethod
    def verify_user(cls, recipient: str, otp: str) -> dict:
        """ """
        verify = OTP.verify_otp(recipient=recipient, otp=otp)
        if not verify.get("status"):
            return {"status": False, "message": "invalid or expired OTP."}
        else:
            user = cls.objects.filter(phone=recipient).first()
            if user is not None:
                user.user_verified = True
                user.save()
                return {
                    "status": True,
                    "message": "user profile was verified successfully.",
                }
            else:
                return {
                    "status": False,
                    "message": "user profile not found.",
                }

    @classmethod
    def sign_in(cls, email: str, password: str) -> dict or None:  # type: ignore
        """ """
        user = authenticate(email=email, password=password)
        if user is None:
            return None
        else:
            if not user.user_verified:
                return {
                    "status": False,
                    "message": "user is not verified.",
                    "user": None,
                    "access": None,
                    "refresh": None,
                }
            else:
                token = RefreshToken.for_user(user)
                user.last_login = datetime.now(tz=pytz.timezone(settings.TIME_ZONE))
                user.save()

                return {
                    "status": True,
                    "message": "success",
                    "user": user.id,
                    "access": str(token.access_token),
                    "refresh": str(token),
                }

    @classmethod
    def get_details(cls, id: str) -> object:
        """ """
        try:
            user = cls.objects.get(id=id)
        except cls.DoesNotExist:
            user = None
        return user

    @classmethod
    def change_password(
        cls, user: object, old_password: str, new_password: str
    ) -> dict:
        """ """
        verify_password = check_password(old_password, user.password)
        if not verify_password:
            return {"message": "old password is incorrect, forgot password?"}
        else:
            # crosscheck passwords for similarities
            if old_password == new_password:
                return {"message": "similar password, try a new one."}
            else:
                user.set_password(new_password)
                user.save()
                return {"message": "password changed successfully."}

    @classmethod
    def forgot_password(cls, phone: str) -> dict:
        """ """
        user = cls.objects.filter(phone=phone).first()
        if user is None:
            return {"status": False, "message": "user profile not found."}
        else:
            otp = OTP.get_otp(type="PASSWORD RESET", recipient=phone)
            send_otp(recipient=phone, code=otp)
            return {
                "status": True,
                "message": "OTP has been sent to your registered phone.",
            }

    @classmethod
    def reset_password(
        cls,
        otp: str,
        new_password: str,
        phone: str,
    ):
        """ """
        verify = OTP.verify_otp(recipient=phone, otp=otp)
        if not verify.get("status"):
            return {"status": False, "message": "invalid or expired OTP."}
        else:
            user = cls.objects.filter(phone=phone).first()
            if user is not None:
                user.set_password(new_password)
                user.save()
                return {"status": True, "message": "password reset was successful."}
            else:
                return {"status": False, "message": "user profile does not exist."}

    @classmethod
    def update_user_details(
        cls,
        user: object,
        first_name: str = None,
        middle_name: str = None,
        last_name: str = None,
    ):
        """ """
        user.first_name = first_name if first_name is not None else user.first_name
        user.middle_name = middle_name if middle_name is not None else user.middle_name
        user.last_name = last_name if last_name is not None else user.last_name
        user.save()
        return user
