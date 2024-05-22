from django.urls import path,include
from .views import UserCreateView, SecurityQuestionCreateView, PassKeyCreateView, CustomAuthToken
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from .views import RepositoryViewSet,OneTimeImageKeyViewSet
# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'repositories', RepositoryViewSet)
router.register(r'one_time_image_keys', OneTimeImageKeyViewSet, basename='one_time_image_key')




urlpatterns = [
    path('register/', UserCreateView.as_view()),
    path('login/', CustomAuthToken.as_view()),
    path('security-questions/', SecurityQuestionCreateView.as_view()),
    path('passkey/', PassKeyCreateView.as_view()),
    path('api-token-auth/', obtain_auth_token),
    path('security-questions/', SecurityQuestionCreateView.as_view()),
     path('', include(router.urls)), 
     path('verify_image/', OneTimeImageKeyViewSet.as_view({'post': 'verify_image'})),
    
 
]