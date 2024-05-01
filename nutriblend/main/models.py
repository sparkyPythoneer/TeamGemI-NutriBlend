from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.db import models

from core.models import BaseModel


User = settings.AUTH_USER_MODEL


class Ingredients(BaseModel):
    name = models.CharField(max_length=225, blank=True, null=True)
    description = models.TextField()

    class Meta:
        verbose_name = "INGREDIENT"
        verbose_name_plural = "INGREDIENTS"

    def __str__(self):
        return self.name


class UserProfile(BaseModel):

    DIET_CHOICES = (
        ("VEG", "Vegetarian"),
        ("VEGN", "Vegan"),
        ("GF", "Gluten Free"),
        ("KF", "Keto"),
        ("PF", "Paleo"),
        ("LF", "Lactose Free"),
        ("DF", "Dairy Free"),
        ("HF", "Halal"),
        ("KF", "Kosher"),
        ("NOP", "No Preferences"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=300, blank=True, null=True)
    country = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=300, blank=True, null=True)
    diatary_prefrence = models.CharField(
        choices=DIET_CHOICES, max_length=150, blank=True, null=True
    )
    allergies = ArrayField(models.TextField(), blank=True, null=True)
    health_condition = ArrayField(models.TextField(), blank=True, null=True)
    ingredient_restrictions = models.ManyToManyField(Ingredients, blank=True)

    class Meta:
        verbose_name = "USER PROFILE"
        verbose_name_plural = "USER PROFILES"

    def __str__(self):
        return self.username or str(self.user)

    @classmethod
    def create_profile(cls, user, **kwargs):
        ingredient_restrictions = kwargs.pop("ingredient_restrictions", [])
        profile = cls.objects.create(user=user, **kwargs)
        profile.ingredient_restrictions.set(ingredient_restrictions)
        return profile

    @classmethod
    def update_profile(cls, uuid, **kwargs):
        profile = cls.objects.get(user__id=uuid)
        for key, value in kwargs.items():
            setattr(profile, key, value)
        profile.save()
        return profile

    @classmethod
    def delete_profile(cls, uuid):
        profile = cls.objects.get(user__id=uuid)
        profile.delete()

    @classmethod
    def get_profile(cls, uuid):
        return cls.objects.get(user__id=uuid)


class ChefProfile(models.Model):
    AVAILABILITY_CHOICES = (
        ("WEEKDAYS", "Weekdays"),
        ("WEEKENDS", "Weekends"),
        ("EVENINGS", "Evenings"),
        ("FULL_TIME", "Full Time"),
        ("PART_TIME", "Part Time"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=225, blank=True, null=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    address = models.TextField()
    rating = models.IntegerField(default=0)
    review = models.TextField()
    order_counts = models.IntegerField(default=0)
    specialties = models.CharField(max_length=255, blank=True, null=True)
    experience = models.IntegerField(default=0)
    availability = models.CharField(
        max_length=50, choices=AVAILABILITY_CHOICES, blank=True, null=True
    )
    certifications = models.CharField(max_length=255, blank=True, null=True)

    price_range = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name = "CHEF PROFILE"
        verbose_name_plural = "CHEF PROFILES"

    def __str__(self):
        return self.business_name or str(self.user)

    @classmethod
    def create_chef_profile(cls, user, **kwargs):
        chef_profile = cls.objects.create(user=user, **kwargs)
        return chef_profile


class Recipes(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=225, blank=True, null=True)
    cuisine_type = models.CharField(max_length=225, blank=True, null=True)
    meal_category = models.CharField(max_length=225, blank=True, null=True)
    cooking_time = models.CharField(max_length=225, blank=True, null=True)
    steps = models.TextField()

    class Meta:
        verbose_name = "RECIPE"
        verbose_name_plural = "RECIPES"

    def __str__(self):
        return self.title


class RecipeDetails(BaseModel):
    recipe = models.ForeignKey("Recipes", on_delete=models.CASCADE)
    ingredients = models.ForeignKey("Ingredients", on_delete=models.CASCADE)
    quantity = models.CharField(max_length=225, blank=True, null=True)

    class Meta:
        verbose_name = "RECIPE DETAIL"
        verbose_name_plural = "RECIPE DETAILS"

    def __str__(self):
        return f"{self.recipe.title} - {self.ingredients.name}"
