from rest_framework import serializers
from .models import User, UserProfile, ChefProfile
from .models import Recipes, Ingredients, RecipeDetails

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']  


class ChefProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChefProfile
        fields = '__all__'
        read_only_fields = ['user']  


class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = ['id', 'name', 'description']

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