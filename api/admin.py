from django.contrib import admin
from .models import Passkey, SecurityQuestion, Repository,OneTimeImageKey

admin.site.register(Passkey)
admin.site.register(SecurityQuestion)
admin.site.register(Repository)
admin.site.register(OneTimeImageKey)















