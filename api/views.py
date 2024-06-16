from rest_framework import generics,serializers,viewsets
from .models import User, SecurityQuestion, Passkey,OneTimeImageKey, Repository
from .serializers import UserSerializer, SecurityQuestionSerializer, SecurityQuestionCreateSerializer, OneTimeImageKeySerializer, PasskeySerializer,RepositorySerializer,UserDetailSerializer
# from django.contrib.auth.backends import ModelBackend
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password, check_password

from django.core.files.storage import default_storage
import hashlib

  


class CustomAuthToken(APIView):

    def post(self, request, *args, **kwargs):
        username_or_email = request.data.get('username_or_email')
        password = request.data.get('password')
        user = authenticate(request, username=username_or_email, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'username': user.username
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
    

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer





class PassKeyCreateView(generics.CreateAPIView):
    queryset = Passkey.objects.all()
    serializer_class = PasskeySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class SecurityQuestionCreateView(generics.CreateAPIView):
#     queryset = SecurityQuestion.objects.all()
#     serializer_class = SecurityQuestionSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         # serializer.save(user=self.request.user)
#         questions = serializer.validated_data['questions']
#         user = self.request.user
#         for question in questions:
#             SecurityQuestion.objects.create(user=user, **question)



class SecurityQuestionCreateView(generics.CreateAPIView):
    serializer_class = SecurityQuestionCreateSerializer
    permission_classes = [IsAuthenticated]


class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Repository.objects.filter(user=self.request.user)


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class OneTimeImageKeyViewSet(viewsets.ModelViewSet):
    queryset = OneTimeImageKey.objects.all()
    serializer_class = OneTimeImageKeySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        image_file = request.FILES.get('image')
        
        if not image_file:
            return Response({'error': 'Image file is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already has an image key
        if OneTimeImageKey.objects.filter(user=user).exists():
            return Response({'error': 'One-time image key already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save image and create hash
        image_instance = OneTimeImageKey.objects.create(user=user, image=image_file)
        image_instance.save()
        
        return Response({'success': 'Image key created successfully.'}, status=status.HTTP_201_CREATED)

    def verify_image(self, request, *args, **kwargs):
        user = request.user
        image_file = request.FILES.get('image')

        if not image_file:
            return Response({'error': 'Image file is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            one_time_image_key = OneTimeImageKey.objects.get(user=user)
        except OneTimeImageKey.DoesNotExist:
            return Response({'error': 'No image key found for user.'}, status=status.HTTP_404_NOT_FOUND)

        # Verify the image by comparing the hash
        stored_image_path = one_time_image_key.image.path
        with open(stored_image_path, 'rb') as f:
            stored_image_data = f.read()
            stored_image_hash = hashlib.sha256(stored_image_data).hexdigest()

        uploaded_image_data = image_file.read()
        uploaded_image_hash = hashlib.sha256(uploaded_image_data).hexdigest()

        if stored_image_hash == uploaded_image_hash:
            return Response({'success': 'Image verification successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Image verification failed.'}, status=status.HTTP_400_BAD_REQUEST)
        

# @api_view(['POST'])
# def verify_passkey(request):
#     user_id = request.data.get('user_id')
#     entered_passkey = request.data.get('passkey')
    
#     try:
#         user = User.objects.get(id=user_id)
#         passkey_obj = user.passkey
#         is_valid = check_password(entered_passkey, passkey_obj.passkey)
#         return Response({'is_valid': is_valid}, status=status.HTTP_200_OK)
#     except User.DoesNotExist:
#         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyPasskeyView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        passkey = request.data.get('passkey')
        
        try:
            user = User.objects.get(id=user_id)
            if hasattr(user, 'passkey') and check_password(passkey, user.passkey.passkey):
                return Response({'is_valid': True}, status=status.HTTP_200_OK)
            else:
                return Response({'is_valid': False}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
             return Response({'is_valid': False}, status=status.HTTP_404_NOT_FOUND)

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer

    def get_object(self):
        user = self.request.user  # assuming you use token authentication or session authentication
        return user
    


class VerifySecurityQuestionsView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        answers = request.data.get('answers')

        try:
            user = User.objects.get(id=user_id)
            security_questions = user.securityquestion_set.all()

            correct_answers = 0
            for question in security_questions:
                if question.answer == answers.get(str(question.id)):
                    correct_answers += 1

            return Response({'correct_answers': correct_answers}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        


class VerifyImageKeyView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        image_key = request.data.get('image_key')

        try:
            user = User.objects.get(id=user_id)
            if hasattr(user, 'onetimeimagekey') and user.onetimeimagekey.image.url == image_key:
                return Response({'is_valid': True}, status=status.HTTP_200_OK)
            else:
                return Response({'is_valid': False}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'is_valid': False}, status=status.HTTP_404_NOT_FOUND)