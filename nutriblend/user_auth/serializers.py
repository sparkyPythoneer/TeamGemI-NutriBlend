from rest_framework import serializers

from helpers.reusable import validate_password

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=True,
        style={"input_type": "password"},
        validators=[validate_password],
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "middle_name",
            "last_name",
            "email",
            "password"
        ]

class UserVerificationSerializer(serializers.Serializer):
    recipient = serializers.EmailField()
    otp = serializers.CharField(max_length=6)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        style={"input_type": "password"},
        write_only=True
    )


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        required=True,
        style={"input_type": "password"},
        write_only=True
    )
    new_password = serializers.CharField(
        required=True,
        style={"input_type": "password"},
        validators=[validate_password],
        write_only=True
    )


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        if not User.objects.filter(email=attrs.get("email")).exists():
            raise serializers.ValidationError(
                {"email": "User with this email does not exist."}
            )
        return attrs


class UserVerificationSerializer(serializers.Serializer):
    recipient = serializers.EmailField()
    otp = serializers.CharField(max_length=6)


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "middle_name",
            "last_name",
        ]


class UserPasswordResetSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(
        required=True,
        style={"input_type": "password"},
        validators=[validate_password],
        write_only=True
    )

    def validate(self, attrs):
        if attrs.get("new_password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"detail": "new password(s) do not match."}
            )
        attrs.pop("confirm_password")
        return attrs