from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from user_auth.models import User, UserProfile


# Register your models here.
class UserResource(resources.ModelResource):
    class Meta:
        model = User

class UserProfileResource(resources.ModelResource):
    class Meta:
        model = UserProfile


# class OtpResource(resources.ModelResource):
#     class Meta:
#         model = Otp



class UserResourceAdmin(ImportExportModelAdmin):
    resource_class = UserResource

    search_fields = [
        "first_name",
        "last_name",
        "email",
    ]

    date_hierarchy = "created_at"
    list_filter = [
        "created_at",
        "is_staff",
        "email_verified",
    
    ]

    def get_list_display(self, request):
        item = [field.name for field in self.model._meta.concrete_fields]

        item.remove("password")

        return item
    

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


# class OtpResourceAdmin(ImportExportModelAdmin):
#     resource_class = OtpResource

#     search_fields = (
#         "user__email",
#         "user__first_name",
#         "user__last_name",
#     )
#     ordering = ("-created_at", "user", "otp", "is_verified", "otp_type")

#     def get_list_display(self, request):
#         return [field.name for field in self.model._meta.concrete_fields]




admin.site.register(User, UserResourceAdmin)
admin.site.register(UserProfile, UserProfileResourceAdmin)
# admin.site.register(Otp, OtpResourceAdmin)