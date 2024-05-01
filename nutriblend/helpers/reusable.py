import base64
from string import punctuation

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as text
from requests import exceptions, request


# Create your reusable function(s) and class(es) here.
def validate_password(password: str):
    """
    Validates the given password based on the criteria.
    Args:
        password (str): The password string to be validated.
    Raises:
        ValidationError:
        if the password fails to meet any of the following criteria:
        - The length of the password is less than 8 characters.
        - The password does not contain at least one numeric digit.
        - The password does not contain at least one uppercase character.
        - The password does not contain at least one lowercase character.
        - The password does not contain at least one special character.
    Returns:
        bool: True if the password passes all validation criteria.
    """
    special_characters = list(punctuation)

    if len(password) < 8:
        raise ValidationError(
            text("Error: the password length cannot be less than 8 characters.")
        )
    if not any(char.isdigit() for char in password):
        raise ValidationError(
            text("Error: the password should have at least one numeric digit.")
        )
    if not any(char.isupper() for char in password):
        raise ValidationError(
            text("Error: the password should have at least one uppercase character.")
        )
    if not any(char.islower() for char in password):
        raise ValidationError(
            text("Error: the password should have at least one lowercase character.")
        )
    if not any(char in special_characters for char in password):
        raise ValidationError(
            text("Error: the password should have at least one special character.")
        )
    return True


def make_request(request_type: str, params: dict) -> dict:
    """
    Make an HTTP request using the specified request_type and parameters.
    Args:
        request_type (str): The type of HTTP request to make (e.g., 'GET', 'POST', 'PUT', 'DELETE', etc.).
        params (dict): A dictionary containing the parameters to be passed in the HTTP request.
    Returns:
        dict: A dictionary containing the response status, data, and error details.
        - 'status': A boolean indicating if the request was successful (True) or not (False).
        - 'data': A dictionary containing the JSON response data if the request was successful, otherwise None.
        - 'error': A dictionary containing error details if the request failed, otherwise None.
    """
    try:
        response = request(request_type, **params)
        try:
            data = response.json()
        except exceptions.JSONDecodeError:
            data = response.text
        return {"status": True, "data": data, "error": None}
    except exceptions.RequestException as error:
        return {"status": False, "data": None, "error": str(error)}


def convert_string_to_base32(text: str):
    """
    Convert a given string to a base32-encoded string.
    Args:
        text (str): The input string that needs to be encoded.
    Returns:
        str: The base32-encoded string representing the input text.
    """
    encoded_bytes = base64.b32encode(text.encode())
    encoded_string = encoded_bytes.decode()
    return encoded_string


def add_prefix_to_phone(phone: str):
    """
    Returns phone number with Nigeria country code.
    """
    if len(phone) >= 11:
        phone = f"234{str(phone)[-10:]}"
        return phone
    raise ValidationError(text("Error: invalid phone number."))
