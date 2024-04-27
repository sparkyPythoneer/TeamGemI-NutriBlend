import base64
from requests import exceptions, request
from string import punctuation

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as text


# Create your reusable function(s) and class(es) here.
def validate_password(password: str):
    """
    Validates the given password based on specific criteria.
    Args:
        password (str): The password string to be validated.
    Raises:
        ValidationError: If the password fails to meet any of the following criteria:
            - The length of the password is less than 8 characters.
            - The password does not contain at least one numeric digit.
            - The password does not contain at least one uppercase character.
            - The password does not contain at least one lowercase character.
            - The password does not contain at least one special character.
    Returns:
        bool: True if the password passes all validation criteria.
    Note:
        - The password must be at least 8 characters long.
        - The password must contain at least one numeric digit (0-9).
        - The password must contain at least one uppercase letter (A-Z).
        - The password must contain at least one lowercase letter (a-z).
        - The password must contain at least one special character (e.g., !@#$%^&*()_-+=).
    """
    special_characters = list(punctuation)

    if len(password) < 8:
        raise ValidationError(
            text("Error: the length of password cannot be less than 8 characters.")
        )
    if not any(char.isdigit() for char in password):
        raise ValidationError(
            text("Error: password should have at least one numeric digit.")
        )
    if not any(char.isupper() for char in password):
        raise ValidationError(
            text("Error: password should have at least one uppercase character.")
        )
    if not any(char.islower() for char in password):
        raise ValidationError(
            text("Error: password should have at least one lowercase character.")
        )
    if not any(char in special_characters for char in password):
        raise ValidationError(
            text("Error: password should have at least one special character.")
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

        The returned dictionary has the following keys:
        - 'status': A boolean indicating if the request was successful (True) or not (False).
        - 'data': A dictionary containing the JSON response data if the request was successful, otherwise None.
        - 'error': A dictionary containing error details if the request failed, otherwise None.

        If the request is successful, 'data' will contain the JSON response obtained from the HTTP request.
        If the request fails, 'error' will contain the following keys:
        - 'message': A string containing the error message.
        - 'provider_response': A string containing the raw response received from the provider (if available).
    Raises:
        None. This function handles exceptions internally.
    Note:
        This function depends on the `request` function from the `requests` module and the `exceptions` module from the same package.
        Make sure to have those modules installed and imported before using this function.
    """
    try:
        response = request(request_type, **params)
        return {"status": True, "data": response.json(), "error": None}
    except exceptions.RequestException as error:
        return {
            "status": False,
            "data": None,
            "error": str(error),
        }


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
