from rest_framework import serializers
from .models import User, UserProfile, ChefProfile

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'user_type', 'email',]

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer() 
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']  


class ChefProfileSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = ChefProfile
        fields = '__all__'
        read_only_fields = ['user']  