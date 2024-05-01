from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from user_auth.models import User


# Register your models here.
class UserResource(resources.ModelResource):
    class Meta:
        model = User


class UserResourceAdmin(ImportExportModelAdmin):
    resource_class = UserResource
    search_fields = [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone",
    ]
    list_filter = [
        "user_verified",
    ]
    date_hierarchy = "created_at"

    def get_list_display(self, request):
        item = [field.name for field in self.model._meta.concrete_fields]
        item.remove("password")
        return item


admin.site.register(User, UserResourceAdmin)
