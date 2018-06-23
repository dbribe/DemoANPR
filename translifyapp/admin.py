from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User
from .models import TextTranslation


class MyUserAdmin(UserAdmin):
    pass


# admin.site.register(User, MyUserAdmin)
admin.site.register(TextTranslation)