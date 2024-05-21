from rest_framework import generics,serializers,viewsets
from .models import User, SecurityQuestion, Passkey
from .serializers import UserSerializer, SecurityQuestionSerializer, SecurityQuestionCreateSerializer, PasskeySerializer,RepositorySerializer
# from django.contrib.auth.backends import ModelBackend
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Repository

  


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


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)