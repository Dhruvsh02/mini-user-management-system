from rest_framework.test import APITestCase
from rest_framework import status 
from django.urls import reverse
from users.models import User 

class SignupTest(APITestCase):
    def test_signup_success(self):
        data = {
            "email": "test1@gmail.com",
            "full_name": "Testing User",
            "password": "Test1111"
        }

        response = self.client.post("/api/auth/signup/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="test1@gmail.com").exists())


class LoginTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test2@gmail.com",
            full_name="Login User",
            password="Login123"
        )

    def test_login_success(self):
        data = {
            "email": "test2@gmail.com",
            "password": "Login123"
        }

        response = self.client.post("/api/auth/login/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

class CurrentUserTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="me@gmail.com",
            full_name="Current User",
            password="Curr123"
        )

        login = self.client.post(
            "/api/auth/login/",
            {"email": "me@gmail.com", "password": "Curr123"},
            format="json"
        )
        self.token = login.data["access"]

    def test_get_current_user(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        response = self.client.get("/api/auth/me/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], "me@gmail.com")

