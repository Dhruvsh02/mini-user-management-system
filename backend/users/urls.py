from django.urls import path
from .views import (
    AdminUserListView,
    ActivateUserView,
    DeactivateUserView,
)

urlpatterns = [
    path('admin/users/', AdminUserListView.as_view(), name='admin_user_list'),
    path('admin/users/<int:user_id>/activate/', ActivateUserView.as_view(), name='activate_user'),
    path('admin/users/<int:user_id>/deactivate/', DeactivateUserView.as_view(), name='deactivate_user'),
]