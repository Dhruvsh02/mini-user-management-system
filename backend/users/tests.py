from rest_framework.test import APITestCase
from rest_framework import status
from users.models import User

class AdminPermissionTest(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(
            email="normal@gmail.com",
            full_name="Normal User",
            password="Nor123",
        )

        login = self.client.post(
            "/api/auth/login/",
            {"email": "normal@gmail.com", "password": "Nor123"},
            format="json"
        )

        self.token = login.data["access"]

    def test_non_admin_access_admin_api(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        response = self.client.get("/api/admin/users/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class AdminAccessTest(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(
            email="admin@gmail.com",
            full_name="Admin User",
            password="Admin123",
            role="admin",
            is_staff=True,
        )
        login = self.client.post(
            "/api/auth/login/",
            {"email": "admin@gmail.com", "password": "Admin123"},
            format="json"
        )

        self.token = login.data["access"]
    
    def test_admin_can_list_users(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        response = self.client.get("/api/admin/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("results", response.data)