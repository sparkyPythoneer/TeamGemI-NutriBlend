from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from main.models import Ingredients, RecipeDetails, Recipes, UserProfile, ChefProfile


# Register your models here.
class UserProfileResource(resources.ModelResource):
    class Meta:
        model = UserProfile


class ChefProfileResource(resources.ModelResource):
    class Meta:
        model = ChefProfile



class UserProfileResourceAdmin(ImportExportModelAdmin):
    resource_class = UserProfileResource

    search_fields = [
        "username",
        "country",
    ]

    date_hierarchy = "created_at"
    

    def get_list_display(self, request):
        item = [field.name for field in self.model._meta.concrete_fields]


        return item
    


class ChefProfileResourceAdmin(ImportExportModelAdmin):
    resource_class = ChefProfileResource

    search_fields = [
        "business_name",
        "email",
    ]

    

    def get_list_display(self, request):
        item = [field.name for field in self.model._meta.concrete_fields]


        return item
    

# Ingredients
class IngredientsResource(resources.ModelResource):
    class Meta:
        model = Ingredients

class IngredientsAdmin(ImportExportModelAdmin):
    resource_class = IngredientsResource
    list_display = [field.name for field in Ingredients._meta.concrete_fields]

admin.site.register(Ingredients, IngredientsAdmin)

# Recipes
class RecipesResource(resources.ModelResource):
    class Meta:
        model = Recipes

class RecipesAdmin(ImportExportModelAdmin):
    resource_class = RecipesResource
    list_display = [field.name for field in Recipes._meta.concrete_fields]
    search_fields = ['title', 'cuisine_type', 'meal_category']

admin.site.register(Recipes, RecipesAdmin)

# RecipeDetails
class RecipeDetailsResource(resources.ModelResource):
    class Meta:
        model = RecipeDetails

class RecipeDetailsAdmin(ImportExportModelAdmin):
    resource_class = RecipeDetailsResource
    list_display = [field.name for field in RecipeDetails._meta.concrete_fields]
    search_fields = ['recipe__title', 'ingredients__name']  # Allows searching through related fields

admin.site.register(RecipeDetails, RecipeDetailsAdmin)
    

admin.site.register(UserProfile, UserProfileResourceAdmin)
admin.site.register(ChefProfile, ChefProfileResourceAdmin)