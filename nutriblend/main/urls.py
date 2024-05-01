from django.urls import path
from .views import *

urlpatterns = [
    path('user-profiles/', UserProfileAPIView.as_view()),
    path('user-profiles/<uuid:user_profile_id>/', UserProfileAPIView.as_view()),
    path('update_user-profiles/<uuid:id>/', UserProfileAPIView.as_view()),
    path('chef-profiles/', ChefProfileAPIView.as_view()),
    path('chef-profiles/<uuid:chef_profile_id>/', ChefProfileAPIView.as_view()),
    path('user-recipes/', UserRecipesListView.as_view(), name='user-recipes'),
    path('recipe/<uuid:id>/', RecipeDetailView.as_view(), name='recipe-detail'),
]