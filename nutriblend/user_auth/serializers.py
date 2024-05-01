from rest_framework import serializers

from helpers.reusable import add_prefix_to_phone, validate_password
from user_auth.models import User


# Create your serializer(s) here.
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={"input_type": "password"},
        validators=[validate_password],
        write_only=True,
    )
    confirm_password = serializers.CharField(
        style={"input_type": "password"},
        validators=[validate_password],
        write_only=True,
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "middle_name",
            "last_name",
            "email",
            "phone",
            "password",
            "confirm_password",
            "user_type",
            "user_verified",
        ]
        read_only_fields = [
            "user_type",
            "user_verified",
        ]

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError({"errors": "password(s) do not match."})
        else:
            attrs.pop("confirm_password")
        attrs["phone"] = add_prefix_to_phone(attrs.get("phone"))
        return attrs


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, validators=[validate_password]
    )


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        style={"input_type": "password"}, validators=[validate_password]
    )
    new_password = serializers.CharField(
        style={"input_type": "password"}, validators=[validate_password]
    )
    confirm_password = serializers.CharField(
        style={"input_type": "password"}, validators=[validate_password]
    )

    def validate(self, attrs):
        if attrs.get("new_password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"errors": "new password(s) do not match."}
            )
        else:
            attrs.pop("confirm_password")
        return attrs


class ForgotPasswordSerializer(serializers.Serializer):
    phone_number = serializers.CharField()

    def validate(self, attrs):
        attrs["phone"] = add_prefix_to_phone(attrs.get("phone"))
        return attrs


class UserVerificationSerializer(serializers.Serializer):
    recipient = serializers.CharField()
    otp = serializers.CharField(max_length=8)

    def validate(self, attrs):
        attrs["recipient"] = add_prefix_to_phone(attrs.get("recipient"))
        return attrs


class UserUpdateSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False)
    middle_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    def validate(self, attrs):
        if len(attrs) == 0:
            raise serializers.ValidationError(
                {{"errors": "no field(s) was passed to be updated."}}
            )
        return super().validate(attrs)


class UserPasswordResetSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=8)
    phone = serializers.CharField()
    new_password = serializers.CharField(
        style={"input_type": "password"}, validators=[validate_password]
    )
    confirm_password = serializers.CharField(
        style={"input_type": "password"}, validators=[validate_password]
    )

    def validate(self, attrs):
        if attrs.get("new_password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"errors": "new password(s) do not match."}
            )
        else:
            attrs.pop("confirm_password")
        attrs["phone"] = add_prefix_to_phone(attrs.get("phone"))
        return attrs
