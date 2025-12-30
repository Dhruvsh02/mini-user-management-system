from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import User
from .serializers import AdminUserListSerializer
from .permissions import IsAdminUserRole

class UserPagination(PageNumberPagination):
    page_size = 10

class AdminUserListView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def get(self, request):
        users = User.objects.all().order_by("-created_at")
        paginator = UserPagination()
        page = paginator.paginate_queryset(users, request)
        serializer = AdminUserListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
class ActivateUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.is_active = True
            user.save()
            return Response(
                {"message": "User activated successfully."},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
class DeactivateUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.is_active = False
            user.save()
            return Response({
                "message": "User deactivated successfully."},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
            


    
