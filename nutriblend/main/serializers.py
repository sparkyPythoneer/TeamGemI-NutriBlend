from rest_framework import serializers
from .models import User, UserProfile, ChefProfile
from .models import Recipes, Ingredients, RecipeDetails

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


class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = ['name', 'description']

class RecipeDetailsSerializer(serializers.ModelSerializer):
    ingredients = IngredientsSerializer()
    
    class Meta:
        model = RecipeDetails
        fields = ['ingredients', 'quantity']

class RecipeSerializer(serializers.ModelSerializer):
    details = RecipeDetailsSerializer(source='recipedetails_set', many=True, read_only=True)

    class Meta:
        model = Recipes
        fields = ['id', 'title', 'cuisine_type', 'meal_category', 'cooking_time', 'steps', 'details']