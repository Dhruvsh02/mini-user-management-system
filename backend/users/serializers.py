from rest_framework import serializers
from .models import User

class AdminUserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "full_name", "role", "is_active", "created_at")