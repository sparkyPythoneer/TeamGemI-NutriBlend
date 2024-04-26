from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import (
    ChangePasswordSerializer,
    ForgotPasswordSerializer,
    UserSerializer,
    UserLoginSerializer,
    UserUpdateSerializer,
    UserPasswordResetSerializer,
    UserVerificationSerializer
)


class UserSignUpAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.sign_up(**serializer.validated_data)
        if user:
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserVerificationAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        verify = User.verify_user(**serializer.validated_data)

        if verify.get("status") == True:
            return Response(data=verify, status=status.HTTP_200_OK)
        return Response(
            errors=verify, status_code=400, status=status.HTTP_400_BAD_REQUEST
        )


class UserSignInAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        
        user = User.objects.filter(email=email).first()
        if user is None:
            return Response(
                {"email": ["Invalid email, please provide a valid email."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not user.check_password(password):
            return Response(
                {"password": ["Invalid password, please provide a valid password."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        sign_in_result = User.sign_in(email=email, password=password)
        if sign_in_result is not None:
            return Response(data=sign_in_result, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Invalid credentials (wrong email or password)."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserDetailsAPIView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        user = User.get_details(request.user.id)
        serializer = UserSerializer(instance=user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        serializer = UserUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        fields_to_be_updated = serializer.validated_data.items()
        if len(fields_to_be_updated) > 0:
            profile_update = User.update_user_details(
                user=request.user, **serializer.validated_data
            )
            if profile_update is not None:
                serializer = UserSerializer(instance=profile_update)
                return Response(
                    data=serializer.data, status=status.HTTP_200_OK
                )
            return Response(
                {"message": "USER PROFILE does not exist."}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"message": "No field(s) was passed to be updated."}, status=status.HTTP_400_BAD_REQUEST
        )


class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = User.change_password(
            user=request.user, **serializer.validated_data
        )
        return Response(data=password, status=status.HTTP_200_OK)


class ForgotPasswordAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        forgot_password = User.forgot_password(**serializer.validated_data)
        if forgot_password.get("status") == True:
            return Response(data=forgot_password, status=status.HTTP_200_OK)
        return Response(forgot_password, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserPasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reset_password = User.reset_password(**serializer.validated_data)
        if reset_password.get("status") == True:
            return Response(data=reset_password, status=status.HTTP_200_OK)
        return Response(reset_password, status=status.HTTP_400_BAD_REQUEST)
