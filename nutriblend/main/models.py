from django.conf import settings
from django.db import models
from core.models import BaseModel


User = settings.AUTH_USER_MODEL


# Create your models here.
class Ingredients(BaseModel):
    name = models.CharField(max_length=225, blank=True, null=True)
    description = models.TextField()


    class Meta:
        verbose_name = "INGREDIENT"
        verbose_name_plural = "INGREDIENTS"


class Recipes(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=225, blank=True, null=True)
    cuisine_type = models.CharField(max_length=225, blank=True, null=True)
    meal_category = models.CharField(max_length=225, blank=True, null=True)
    cooking_time = models.CharField(max_length=225, blank=True, null=True)
    step = models.TextField()

    class Meta:
        verbose_name = "RECIPE"
        verbose_name_plural = "RECIPES"


class RecipeDetails(BaseModel):
    
    recipe = models.ForeignKey('Recipes', on_delete=models.CASCADE)
    ingredients = models.ForeignKey('Ingredients', on_delete=models.CASCADE)
    quantity = models.CharField(max_length=225, blank=True, null=True)

    class Meta:
        verbose_name = "RECIPE DETAIL"
        verbose_name_plural = "RECIPE DETAILS"



# class UserInteraction(BaseModel):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE)
#     like = models.BooleanField()





