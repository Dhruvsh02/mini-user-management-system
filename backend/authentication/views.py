from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, LoginSerializer, CurrentUserSerializer
from .serializers import UpdateProfileSerializer, ChangePasswordSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


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

    @swagger_auto_schema(request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
        },
    ),
        required=['email', 'password'], 
    )

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
    

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(slef, request):
        serializer = UpdateProfileSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "profile updated sucessfully"
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ChangepasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = ChangePasswordSerializer(
            data = request.data,
            context = {"request": request}
        )
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data["new_password"])
            user.save()
            return Response(
                {
                    "message": "Password changed successfully."
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)