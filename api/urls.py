from django.urls import path,include
from .views import UserCreateView, SecurityQuestionCreateView, PassKeyCreateView, CustomAuthToken
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from .views import RepositoryViewSet
# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'repositories', RepositoryViewSet)



urlpatterns = [
    path('register/', UserCreateView.as_view()),
    path('login/', CustomAuthToken.as_view()),
    path('security-questions/', SecurityQuestionCreateView.as_view()),
    path('passkey/', PassKeyCreateView.as_view()),
    path('api-token-auth/', obtain_auth_token),
    path('security-questions/', SecurityQuestionCreateView.as_view()),
     path('', include(router.urls)), 
    
 
]