from rest_framework import serializers
from .models import User, SecurityQuestion, Passkey, Repository
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


class PasskeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Passkey
        fields = ['passkey']

    def create(self, validated_data):
        user = self.context['request'].user
        raw_passkey = validated_data['passkey']
        
        # Hash the passkey
        hashed_passkey = make_password(raw_passkey)

        # Save the hashed passkey in the database
        passkey_instance, created = Passkey.objects.update_or_create(
            user=user,
            defaults={'passkey': hashed_passkey}
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
    # picture_url = serializers.URLField(write_only=True, required=False)
    class Meta:
        model = Repository
        # fields = ['id', 'user', 'account_name', 'password', 'picture', 'picture_url']
        fields = ['id','user','account_name','password','picture']

        # def create(self, validated_data):
        #     picture_url = validated_data.pop('picture_url', None)
        #     if picture_url:
        #         response = requests.get(picture_url)
        #         image_name = picture_url.split("/")[-1]
        #         validated_data['picture'] = ContentFile(response.content, image_name)
        #     return super().create(validated_data)


