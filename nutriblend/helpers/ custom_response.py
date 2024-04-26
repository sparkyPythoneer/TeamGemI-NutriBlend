from rest_framework.response import Response as DRFResponse


# Create your custom response(s) here.
class InvalidResponse(Exception):
    pass


class Response:
    """
    A utility class to create standardized response objects for API responses.
    This class provides methods to format and validate the response data before returning
    the final response object.
    Attributes:
        None
    """
    def __new__(cls, data=None, errors=None, status_code=None, *args, **kwargs):
        """
        Creates a new Response instance and returns a DRFResponse object with the
        formatted payload.
        Args:
            data (dict or None): The response data as a dictionary or None.
            errors (dict or None): The response errors as a dictionary or None.
            status_code (int or None): The HTTP status code for the response (optional).
            *args: Additional arguments to pass to the DRFResponse constructor.
            **kwargs: Additional keyword arguments to pass to the DRFResponse constructor.
        Returns:
            DRFResponse: The final response object containing the formatted payload.
        """
        payload = cls.format(data, errors, status_code)
        return DRFResponse(payload, *args, **kwargs)

    @classmethod
    def format(cls, data, errors, status_code):
        """
        Formats the response data and errors to create a payload dictionary.
        This method processes the provided data and errors to determine the status of the response
        and constructs a payload dictionary with the necessary information.
        Args:
            data (dict or None): The response data as a dictionary or None.
            errors (dict or None): The response errors as a dictionary or None.
            status_code (int or None): The HTTP status code for the response (optional).
        Returns:
            dict: The formatted payload dictionary with the status, status_code, data, and errors.
        Raises:
            InvalidResponse: If both data and errors are None, indicating an invalid response.
        """
        data, errors = cls.validate(data, errors)
        status = 'success' if data and not errors else 'failure'
        if not data and not errors:
            raise InvalidResponse('Both data and errors cannot be None.')
        return dict(
            status=status,
            status_code=status_code,
            data=data,
            errors=errors
        )

    @classmethod
    def validate(cls, data, errors):
        """
        Validates the provided data and errors, ensuring they are dictionary-like structures.
        This method ensures that the provided data and errors are either dictionary-like structures
        or None, allowing them to be processed further.
        Args:
            data (dict or None): The response data as a dictionary or None.
            errors (dict or None): The response errors as a dictionary or None.
        Returns:
            tuple: A tuple containing the validated data and errors.
        Raises:
            InvalidResponse: If either data or errors is not None and not a dictionary-like structure.
        """
        try:
            data = None if data is None else dict(data)
            errors = None if errors is None else dict(errors)
            return (data, errors)
        except Exception as TypeError:
            raise InvalidResponse(
                'None or dict-like structure expected for both data and errors.')
