from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import User
from .serializers import AdminUserListSerializer
from .permissions import IsAdminUserRole

class AdminUserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class AdminUserListView(ListAPIView):
    serializer_class = AdminUserListSerializer
    permission_classes = [IsAuthenticated, IsAdminUserRole]
    pagination_class = AdminUserPagination

    def get_queryset(self):
        # ✅ STABLE ordering (CRITICAL)
        return User.objects.all().order_by("-id")

    def list(self, request, *args, **kwargs):
        # ✅ stats request (NO pagination)
        if request.query_params.get("all") == "true":
            users = self.get_queryset()
            serializer = self.get_serializer(users, many=True)
            return Response(
                {
                    "count": users.count(),
                    "results": serializer.data
                },
                status=status.HTTP_200_OK
            )

        # ✅ normal paginated list
        return super().list(request, *args, **kwargs)
  
class ActivateUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def patch(self, request, user_id):
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

    def patch(self, request, user_id):
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
            


    
