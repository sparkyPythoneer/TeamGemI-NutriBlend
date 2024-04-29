from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from main.models import UserProfile, ChefProfile


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
    

admin.site.register(UserProfile, UserProfileResourceAdmin)
admin.site.register(ChefProfile, ChefProfileResourceAdmin)