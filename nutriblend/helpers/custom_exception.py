from rest_framework.views import exception_handler

from .custom_response import Response


# Custom exception handler.
def custom_exception_handler(exception, context):
    """
    Custom Exception Handler for Django REST framework.
    This function is designed to be used as a custom exception handler in Django REST framework.
    It takes two parameters, `exception` (the raised exception) and `context` (context of the exception).
    The function calls the default exception handler (`exception_handler`) to get the response.
    If the response is not None, it extracts the status code from the response.
    Then, it creates a new `Response` object with the errors data from the original response,
    along with the extracted status code and status, and returns it.
    Args:
        exception (Exception): The raised exception object.
        context (dict): The context of the exception.
    Returns:
        Response: A new Response object with error data and status code from the original response.
    Example usage:
    ```
    # In your Django settings.py
    REST_FRAMEWORK = {
        'EXCEPTION_HANDLER': 'path.to.custom_exception_handler',
    }
    ```
    Note:
    - This function assumes that `exception_handler` is a valid exception handler function
      from Django REST framework. Make sure to import it correctly in your code.
    - The `Response` class used in this function should be the one from Django REST framework.
      Adjust the import statement based on your actual project structure.
    """
    response = exception_handler(exception, context)
    if response is not None:
        status_code = response.status_code
    return Response(
        errors=response.data,
        status_code=status_code,
        status=response.status_code
    )
