from django.urls import path
from .views import *

urlpatterns = [
    path('user-profiles/', UserProfileAPIView.as_view()),
    path('user-profiles/<uuid:id>/', UserProfileAPIView.as_view()),
    path('chef-profiles/', ChefProfileAPIView.as_view()),
    path('user-recipes/', UserRecipesListView.as_view(), name='user-recipes'),
    path('recipe/<uuid:id>/', RecipeDetailView.as_view(), name='recipe-detail'),
    path('recipe/<uuid:recipe_id>/add-ingredients/', AddIngredientsToRecipeDetails.as_view(), name='add_ingredients_to_recipe_details'),
]