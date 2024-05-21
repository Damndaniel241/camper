from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()



class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id','username','email','password']
        extra_kwargs = {'passwword':{'wwrite_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SecurityQuestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)


class Passkey(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    passkey = models.CharField(max_length=255)


class Repository(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Linking the repository to a user
    account_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    picture = models.ImageField(upload_to='repository_pictures/',null=True, blank=True)
    # picture_url = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.user} created {self.account_name} account"