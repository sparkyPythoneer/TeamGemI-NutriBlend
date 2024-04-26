from django.contrib import admin

from .models import OTP


# Register your model(s) here.
class OTPAdmin(admin.ModelAdmin):
    search_fields = [
        "recipient"
    ]
    list_filter = ("is_used",)
    date_hierarchy = "created_at"


admin.site.register(OTP, OTPAdmin)