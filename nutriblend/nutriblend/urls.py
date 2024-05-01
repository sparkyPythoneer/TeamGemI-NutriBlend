from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", include("user_auth.urls")),
    path("main/", include("main.urls")),
    path("ai/", include("ai.urls")),
]
