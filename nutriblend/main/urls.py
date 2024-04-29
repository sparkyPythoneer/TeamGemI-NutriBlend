from django.urls import path
from . import views

urlpatterns = [
    path('user-profiles/', views.UserProfileAPIView.as_view()),
    path('user-profiles/<uuid:id>/', views.UserProfileAPIView.as_view()),
    path('chef-profiles/', views.ChefProfileAPIView.as_view()),
]
