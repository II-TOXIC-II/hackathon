# Register your models here.
from django.contrib import admin

from . import models

admin.site.register(models.TableFile)
admin.site.register(models.CustomUser)
