from django.contrib import admin
from api.users.models import User, Subscription
# Register your models here.
admin.site.register(User)
admin.site.register(Subscription)