
from django.urls import path

from . import views


# Create your url pattern(s) here.
urlpatterns = [
    path("auth/register/", views.UserSignUpAPIView.as_view()),
    path("auth/verify/", views.UserVerificationAPIView.as_view()),
    path("auth/login/", views.UserSignInAPIView.as_view()),
    path("auth/details/", views.UserDetailsAPIView.as_view()),
    path("auth/cnge-password/", views.ChangePasswordAPIView.as_view()),
    path("auth/forgot-password/", views.ForgotPasswordAPIView.as_view()),
    path("auth/reset-password/", views.ResetPasswordAPIView.as_view())

]