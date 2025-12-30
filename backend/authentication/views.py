from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializers = SignupSerializer(data = request.data)
        if serializers.is_valid():
            user = serializers.save()
            return Response({
                "message": "User registered successfully",
                "email": user.email,
                "role": user.role,
            },
            status = status.HTTP_201_CREATED,
     )
        return Response(serializers.errors, status = status.HTTP_400_BAD_REQUEST)