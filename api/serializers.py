from rest_framework import serializers
from .models import User, SecurityQuestion, Passkey, Repository, OneTimeImageKey
from cryptography.fernet import Fernet
from django.contrib.auth.hashers import make_password, check_password

from django.core.files.base import ContentFile
import requests

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# class SecurityQuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SecurityQuestion
#         fields = '__all__'

# class SecurityQuestionListSerializer(serializers.Serializer):
#     questions = SecurityQuestionSerializer(many=True)

# class PasskeySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Passkey
#         fields = '__all__'


#hashed
# class PasskeySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Passkey
#         fields = ['passkey']

#     def create(self, validated_data):
#         user = self.context['request'].user
#         raw_passkey = validated_data['passkey']
        
#         # Hash the passkey
#         hashed_passkey = make_password(raw_passkey)

#         # Save the hashed passkey in the database
#         passkey_instance, created = Passkey.objects.update_or_create(
#             user=user,
#             defaults={'passkey': hashed_passkey}
#         )
#         return passkey_instance


#unhashed
class PasskeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Passkey
        fields = ['passkey']

    def create(self, validated_data):
        user = self.context['request'].user
        raw_passkey = validated_data['passkey']

        # Save the passkey in the database as plain text
        passkey_instance, created = Passkey.objects.update_or_create(
            user=user,
            defaults={'passkey': raw_passkey}
        )
        return passkey_instance


class SecurityQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecurityQuestion
        fields = ['question', 'answer']



# class SecurityQuestionCreateSerializer(serializers.Serializer):
#     security_questions = SecurityQuestionSerializer(many=True)

#     def create(self, validated_data):
#         user = self.context['request'].user
#         questions_data = validated_data.pop('security_questions')
#         for question_data in questions_data:
#             SecurityQuestion.objects.create(user=user, **question_data)
#         return validated_data



class SecurityQuestionCreateSerializer(serializers.Serializer):
    security_questions = SecurityQuestionSerializer(many=True)

    def create(self, validated_data):
        user = self.context['request'].user
        questions_data = validated_data.get('security_questions')
        for question_data in questions_data:
            SecurityQuestion.objects.create(user=user, **question_data)
        return validated_data
    

class RepositorySerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Repository
       
        fields = ['id','user','account_name','password','picture']

    # def create(self, validated_data):
    #     repository = Repository.objects.create(user=self.context['request'].user, **validated_data)
    #     return repository

    def update(self, instance, validated_data):
        instance.account_name = validated_data.get('account_name', instance.account_name)
        instance.password = validated_data.get('password', instance.password)
        instance.picture = validated_data.get('picture', instance.picture)
        instance.save()
        return instance
    # def update(self, instance, validated_data):
    #     instance.account_name = validated_data.get('account_name', instance.account_name)
    #     instance.password = validated_data.get('password', instance.password)
    #     if 'picture' in validated_data:
    #         instance.picture = validated_data.get('picture')
    #     instance.save()
    #     return instance
   
class OneTimeImageKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = OneTimeImageKey
        fields = ['id', 'user', 'image', 'created_at']



class UserDetailSerializer(serializers.ModelSerializer):
    security_questions = SecurityQuestionSerializer(many=True, read_only=True)
    passkey = PasskeySerializer(read_only=True)
    imagekey = OneTimeImageKeySerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'security_questions', 'passkey', 'imagekey']