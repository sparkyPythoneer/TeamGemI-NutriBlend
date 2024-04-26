from django.contrib.auth.models import BaseUserManager


# Create your manager(s) here.
class UserManager(BaseUserManager):
    """
    Custom user manager for the User model.
    """

    use_in_migrations = True

    def _create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a user with the given email and password.
        Args:
            email (str): The email address of the user.
            password (str, optional): The password for the user. Defaults to None.
            **extra_fields: Additional fields for the user model.
        Returns:
            User: The newly created user object.
        Raises:
            ValueError: If the email is not provided.
        """
        if not email:
            raise ValueError('Users must provide a valid email address.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates a regular user with the given email and password.s
        Args:
            email (str): The email address of the user.
            password (str, optional): The password for the user. Defaults to None.
            **extra_fields: Additional fields for the user model.
        Returns:
            User: The newly created user object.
        """
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """
        Creates a superuser with the given email and password.
        Args:
            email (str): The email address of the user.
            password (str): The password for the superuser.
            **extra_fields: Additional fields for the user model.
        Returns:
            User: The newly created superuser object.
        Raises:
            ValueError: If the is_staff or is_superuser fields are not set to True.
        """
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError(('Superuser must have is_staff=True.'))

        if extra_fields.get('is_superuser') is not True:
            raise ValueError(('Superuser must have is_superuser=True.'))
        return self._create_user(
            email,
            password,
            **extra_fields
        )