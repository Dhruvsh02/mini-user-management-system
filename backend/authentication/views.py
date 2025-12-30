from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, LoginSerializer, CurrentUserSerializer


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
    

class LoginView(APIView):
    Permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "email": user.email,
                    "role": user.role,
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)