from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Recipes, UserProfile, ChefProfile


from .serializers import (
    ChefProfileSerializer,
    RecipeSerializer,
    UserProfileSerializer,
)

# Create your views here.


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            profile = UserProfile.create_profile(user, **serializer.validated_data)
            return Response(
                UserProfileSerializer(profile).data, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        profile = UserProfile.update_profile(id, **request.data)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def delete(self, request, id):
        UserProfile.delete_profile(id)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, id):
        profile = UserProfile.get_profile(id)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)


class ChefProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChefProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            chef_profile = ChefProfile.create_chef_profile(
                user, **serializer.validated_data
            )
            return Response(
                ChefProfileSerializer(chef_profile).data, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRecipesListView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Recipes.objects.filter(user=user)

class RecipeDetailView(generics.RetrieveAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
