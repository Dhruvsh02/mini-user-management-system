from django.urls import path
from .views import SignupView, LoginView, CurrentUserView, UpdateProfileView, ChangepasswordView


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', CurrentUserView.as_view(), name='current_user'),
    path('profile/', UpdateProfileView.as_view(), name='update_profile'),
    path('change-password/', ChangepasswordView.as_view(), name='change_password'),
]