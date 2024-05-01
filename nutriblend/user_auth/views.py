from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from user_auth.models import User
from user_auth.serializers import (
    ChangePasswordSerializer,
    ForgotPasswordSerializer,
    UserSerializer,
    UserLoginSerializer,
    UserUpdateSerializer,
    UserPasswordResetSerializer,
    UserVerificationSerializer,
)


# Create your view(s) here.
class UserSignUpAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        User.sign_up(**serializer.validated_data)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class UserVerificationAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        verify = User.verify_user(**serializer.validated_data)

        if not verify.get("status"):
            return Response(data=verify, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data=verify, status=status.HTTP_200_OK)


class UserSignInAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.sign_in(**serializer.validated_data)
        if user is None:
            return Response(
                data={"message": "invalid credentials (wrong email or password)."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            if not user.get("status"):
                return Response(
                    data=user,
                    status=status.HTTP_412_PRECONDITION_FAILED,
                )
            else:
                return Response(data=user, status=status.HTTP_200_OK)


class UserDetailsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.get_details(request.user.id)
        serializer = UserSerializer(instance=user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        serializer = UserUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile_update = User.update_user_details(
            user=request.user, **serializer.validated_data
        )
        serializer = UserSerializer(instance=profile_update)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = User.change_password(user=request.user, **serializer.validated_data)
        return Response(data=password, status=status.HTTP_200_OK)


class ForgotPasswordAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        forgot_password = User.forgot_password(**serializer.validated_data)
        if not forgot_password.get("status"):
            return Response(data=forgot_password, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data=forgot_password, status=status.HTTP_200_OK)


class ResetPasswordAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserPasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reset_password = User.reset_password(**serializer.validated_data)
        if reset_password.get("status") == True:
            return Response(data=reset_password, status=status.HTTP_200_OK)
        return Response(data=reset_password, status=status.HTTP_400_BAD_REQUEST)
