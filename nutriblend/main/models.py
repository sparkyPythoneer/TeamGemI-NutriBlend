from django.db import models
from datetime import datetime

from nutriblend.user_auth.models import User
# Create your models here.

class Ingredients(models.Model):
    name = models.CharField(max_length=225, blank=True, null=True)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "INGREDIENT"
        verbose_name_plural = "INGREDIENTS"


class Recipies(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=225, blank=True, null=True)
    cuisine_type = models.CharField(max_length=225, blank=True, null=True)
    meal_category = models.CharField(max_length=225, blank=True, null=True)
    cooking_time = models.DurationField(blank=True, null=True)
    step = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "RECIPE"
        verbose_name_plural = "RECIPES"


class RecipieDetails(models.Model):
    recipie = models.ManyToOneRel(Recipies, on_delete=models.CASCADE)
    ingredients = models.ManyToOneRel(Ingredients, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbos_name = "RECIPIE DETAIL"
        verbose_name_plural = "RECIPIE DETAILS"



# class UserInteraction(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     recipie = models.ForeignKey(Recipies, on_delete=models.CASCADE)
#     like = models.BooleanField()





