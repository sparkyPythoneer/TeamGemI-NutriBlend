import pytz
from datetime import datetime

from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.shortcuts import get_object_or_404

from rest_framework_simplejwt.tokens import RefreshToken

from core.models import BaseModel, OTP
from helpers.reusable import validate_password
from .managers import UserManager
from django.contrib.postgres.fields import ArrayField, JSONField


# Create your model(s) here.
class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    """
    Custom user model representing a user profile.
    """
    first_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    email_verified = models.BooleanField(default=False)
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
        """
        Returns the full name of the person.
        If both the first name and last name are available,
        it concatenates them with a space in between and returns the full name.
        If either the first name or last name is missing, it returns None.
        Returns:
            str: The full name of the person, or None if first name or last name is missing.
        """
        if not self.first_name or not self.last_name:
            return None
        else:
            return f"{self.first_name} {self.last_name}"

    @classmethod
    def sign_up(
        cls,
        first_name: str,
        last_name: str,
        email: str,
        password: str
    ) -> bool:
        """
        Validates and creates a new user instance.
        Args:
            cls (class): The class reference for the user model.
            first_name (str): The first name of the user.
            last_name (str): The last name of the user.
            email (str): The email address of the user.
            password (str): The password for the user.
        Returns:
            bool: True if the user instance is created successfully.

        """
        user = cls.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        otp = OTP.get_otp(
            type="REGISTRATION",
            recipient=user.email,
            length=6,
            expiry_time=10
        )
        return user

    @classmethod
    def verify_user(cls, recipient: str, otp: str) -> dict:
        """
        Verifies the user profile based on the provided OTP.
        Args:
            cls (class): The class reference for the user model.
            recipient (str): The email address of the user profile to verify.
            otp (str): The one-time password to validate.
        Returns:
            dict: A dictionary containing the verification status and message.
        """

        if settings.DEBUG:
            if otp == settings.DEFAULT_OTP:
                return {
                    "status": True,
                    "message": "USER PROFILE was verified successfully."
                }
        else:
            verify = OTP.verify_otp(recipient=recipient, otp=otp)
            if verify.get("status") == True:
                user = cls.objects.filter(email=recipient)
                if user.exists():
                    user.update(email_verified=True)
                    return {
                        "status": True,
                        "message": "USER PROFILE was verified successfully."
                    }
                return {
                    "status": False,
                    "message": "email is not registered to any USER PROFILE."
                }
            return {
                "status": False,
                "message": "invalid or expired OTP."
            }

    @classmethod
    def sign_in(cls, email: str, password: str) -> dict or None: # type: ignore
        """
        Authenticates a user with the provided email and password, generating a token for successful sign-in.
        Args:
            cls (class): The class reference for the user model.
            email (str): The email address of the user.
            password (str): The password of the user.
        Returns:
            dict or None: A dictionary containing sign-in information if successful, or None if authentication fails.
                - status (bool): The status of the sign-in attempt (True for success, False otherwise).
                - user (int): The ID of the authenticated user.
                - access (str): The access token for the authenticated user.
                - message (str): (Optional) A message indicating that the user profile is not verified.
        """
        user = authenticate(email=email, password=password)
        if user is not None:
            if not user.email_verified:
                return {"message": "USER PROFILE is not verified."}
            token = RefreshToken.for_user(user)
            user.last_login = datetime.now(
                tz=pytz.timezone(settings.TIME_ZONE)
            )
            user.save()

            data = {
                "status": True,
                "user": user.id,
                "access": str(token.access_token),
                "refresh": str(token)
            }
            return data
        return None

    @classmethod
    def get_details(cls, id: str) -> object:
        """
        Retrieve user details based on the given ID.
        Args:
            cls (class): The class reference for the user model.
            id (str): The ID of the user to retrieve.
        Returns:
            object: The user object representing the details.
        Raises:
            Http404: If the user with the given ID does not exist.
        """
        user = get_object_or_404(User, pk=id)
        return user

    @classmethod
    def change_password(cls, user: isinstance, old_password: str, new_password: str) -> dict:
        """
        Change the password of a user.
        Args:
            cls (class): The class reference for the user model.
            user (object): The user object for which the password will be changed.
            old_password (str): The old password entered by the user.
            new_password (str): The new password to be set for the user.
        Returns:
            dict: A dictionary containing a message indicating the status of the password change.
        """
        if user:
            verify_password = check_password(old_password, user.password)
            if verify_password:
                # crosscheck passwords for similarities
                if old_password == new_password:
                    return {"message": "similar password, try a new one."}
                user.set_password(new_password)
                user.save()
                return {"message": "password changed successfully."}
            return {"message": "old password is incorrect, forgot password?"}
        return {"message": "user does not exist."}

    @classmethod
    def forgot_password(cls, email: str = None, phone_number: str = None) -> dict:
        """
        Send a password reset OTP to the user's email or phone number.
        Args:
            email (str): User's email address for password reset. Defaults to None.
            phone_number (str): User's phone number for password reset. Defaults to None.
        Returns:
            dict: A dictionary containing the status and message of the operation.
                - status (bool): True if OTP sent successfully, False otherwise.
                - message (str): Message describing the outcome of the operation.
        """
        if email is not None:
            user = cls.objects.filter(email=email).first()
            if user is not None:
                otp = OTP.get_otp(
                    type="PASSWORD RESET",
                    recipient=email,
                    length=6,
                    expiry_time=10
                )
                return {
                    "status": True,
                    "message": "OTP has been sent to your registered email."
                }
            return {
                "status": False,
                "message": "USER PROFILE does not exist."
            }

        if phone_number is not None:
            pass

    @classmethod
    def reset_password(cls, otp: str, new_password: str, email: str = None, phone_number: str = None):
        """
        Set a new password for an existing user.
        Args:
            cls (class): The class reference for the user model.
            otp (str): One time password used for verification.
            new_password (str): The new password to be set for the user.
            email (str): User's email address for password reset. Defaults to None.
            phone_number (str): User's phone number for password reset. Defaults to None.
        Returns:
            dict: A dictionary containing the status and message of the operation.
                - status (bool): True if password reset was successful, False otherwise.
                - message (str): Message describing the outcome of the operation.
        """
        verify = OTP.verify_otp(
            recipient=email if email is not None else phone_number,
            otp=otp
        )
        if verify.get("status") == True:
            if email is not None:
                user = cls.objects.filter(email=email).first()
                if user is not None:
                    user.set_password(new_password)
                    user.save()
                    return {
                        "status": True,
                        "message": "password reset was successful."
                    }
                return {
                    "status": False,
                    "message": "USER PROFILE does not exist."
                }

            if phone_number is not None:
                pass
        return {
            "status": False,
            "message": "invalid or expired OTP."
        }
    

    @classmethod
    def update_user_details(
        cls,
        user,
        first_name: str = None,
        middle_name: str = None,
        last_name: str = None,
        address: str = None
    ):
        """
        Update the details of a user object based on the provided parameters.
        Args:
            cls (class): The class reference for the user model.
            user (User): The User object.
            first_name (str): The new first name of the user.
            middle_name (str): The new middle name of the user.
            last_name (str): The new last name of the user.
            address (str): The new address of the user.
        Returns:
            user: If the user is found and updated successfully, returns the updated user object.
            None: If the user is not found or inactive, returns None.
        """
        user = cls.objects.filter(email=user.email, is_active=True).first()
        if user is not None:
            user.first_name = first_name if first_name is not None else user.first_name
            user.middle_name = middle_name if middle_name is not None else user.middle_name
            user.last_name = last_name if last_name is not None else user.last_name
            user.address = address if address is not None else user.address
            user.save()
            return user
        return None
    



class UserProfile(models.Model):

    DIET_CHOICES = (
        ('VEG', 'Vegetarian'),
        ('VEGN', 'Vegan'),
        ('GF', 'Gluten Free'),
        ('KF', 'Keto'),
        ('PF', 'Paleo'),
        ('LF', 'Lactose Free'),
        ('DF', 'Dairy Free'),
        ('HF', 'Halal'),
        ('KF', 'Kosher'),
        ('NOP', 'No Preferences'),
    )

    user = models.OneToOneField()
    username = models.CharField(max_length=300, blank=True, null=True)
    country = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=300, blank=True, null=True)
    diatary_prefrence =  models.CharField(choices=DIET_CHOICES, max_length=150, blank=True, null=True)
    allergies = ArrayField(models.TextField(), blank=True, null=True)
    health_preference = ArrayField(models.TextField(), blank=True, null=True)
    ingredient_restrictions = models.ForeignKey()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)



