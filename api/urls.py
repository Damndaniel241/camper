from django.urls import path,include
from .views import UserCreateView, SecurityQuestionCreateView, PassKeyCreateView,CustomAuthToken,UserDetailView,\
VerifyPasskeyView,VerifySecurityQuestionsView,VerifyImageKeyView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from .views import RepositoryViewSet,OneTimeImageKeyViewSet, DeleteAllRepositoriesView
# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'repositories', RepositoryViewSet, basename='repository')
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
    path('user/<int:pk>/', UserDetailView.as_view()),
    path('verify_passkey/', VerifyPasskeyView.as_view()),
    path('api/verify_security_questions/', VerifySecurityQuestionsView.as_view()),
    path('api/verify_image_key/', VerifyImageKeyView.as_view()),
    path('repository/delete_all/', DeleteAllRepositoriesView.as_view()),
    
 
]

# curl -X DELETE http://127.0.0.1:8000/api/repositories/delete_all/ -H "Authorization: Token 9ee0befbadfc6284a06a77e40fec147d33642462"
