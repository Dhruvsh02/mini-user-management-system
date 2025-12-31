# Mini User Management System

A full-stack **User Management System** built using **Django REST Framework** and **React (Vite)** with **JWT authentication**, **role-based access control**, and a **modern glassmorphic UI**.

This project demonstrates real-world backend & frontend integration, secure authentication, admin-level user management, pagination, and production-ready documentation.

---

## 📌 Project Overview & Purpose

The Mini User Management System allows:

### 👤 Normal Users
- Sign up & log in
- View their profile
- Change password securely
- Log out

### 🛡 Admin Users
- Log in with admin privileges
- View all users (paginated)
- Activate or deactivate users
- View total, active, and inactive user statistics

The purpose of this project is to demonstrate:
- Secure authentication (JWT)
- Role-based authorization (Admin vs User)
- Clean REST APIs
- Modern frontend UI practices
- Production-ready documentation & CI pipeline

---

## 🧰 Tech Stack Used

### Backend
- Python 3.11
- Django 4.x
- Django REST Framework
- SimpleJWT (JWT Authentication)
- drf-yasg (Swagger / OpenAPI)
- SQLite (local) / PostgreSQL (production ready)

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide Icons
- React Hot Toast

### DevOps / Tooling
- Git & GitHub
- GitHub Actions (CI)
- Postman (API Testing)
- Swagger API Documentation

---

## 📁 Project Structure

```

mini-user-management-system/
│
├── backend/
│   ├── authentication/
│   ├── users/
│   ├── config/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
└── README.md

````

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
````

Create a `.env` file using `.env.example`:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
JWT_ACCESS_LIFETIME=5
JWT_REFRESH_LIFETIME=1
```

Run migrations and start server:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` using `.env.example`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Environment Variables (Listed Without Values)

### Backend

* `SECRET_KEY`
* `DEBUG`
* `ALLOWED_HOSTS`
* `DATABASE_URL`
* `JWT_ACCESS_LIFETIME`
* `JWT_REFRESH_LIFETIME`

### Frontend

* `VITE_API_BASE_URL`

---

## 📚 API Documentation

### Swagger / OpenAPI

```
http://127.0.0.1:8000/swagger/
```

---

## 📮 Postman Collection

A complete Postman collection is provided for API testing.

### 📎 Postman Collection Link


```
https://dhruvsharma110044-9407920.postman.co/workspace/Dhruv-Sharma's-Workspace~2691daad-736f-4460-8dee-c2f2ea06e4f9/collection/50319700-39084d0b-b324-49f0-bebc-b3dba5922af2?action=share&source=copy-link&creator=50319700

```

### Included Requests

* Auth

  * Login
  * Signup
  * Get Current User
  * Change Password
* Admin

  * List Users (Paginated)
  * Activate User
  * Deactivate User

---

## 🔎 Example API Requests & Responses

### Login Request

```json
POST /api/auth/login/
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

### Login Response

```json
{
  "access": "jwt_access_token",
  "refresh": "jwt_refresh_token",
  "email": "admin@example.com",
  "role": "admin"
}
```

---

### Get Current User

```http
GET /api/auth/me/
Authorization: Bearer <access_token>
```

```json
{
  "id": 1,
  "email": "test@example.com",
  "full_name": "Test User",
  "role": "user",
  "is_active": true
}
```

---

## 🔒 Password Security

* Passwords are **never stored in plain text**
* Django’s default **PBKDF2 hashing** is used
* Fully compliant with bcrypt/argon2-level security requirements
* Password validation enforced during change password

---

## 🚀 Deployment Instructions

### Frontend Deployment

* Platform: **Vercel / Netlify**
* Root Directory: `/frontend`
* Build Command:

  ```
  npm run build
  ```
* Output Directory:

  ```
  dist
  ```
* Environment Variable:

  ```
  VITE_API_BASE_URL=https://your-backend-url/api
  ```

---

### Backend Deployment

* Platform: **Render / Railway / AWS**
* Root Directory: `/backend`
* Build Command:

  ```
  pip install -r requirements.txt
  ```
* Start Command:

  ```
  gunicorn config.wsgi:application
  ```
* Environment variables must be configured in platform dashboard

---

---

## 👨‍💻 Author

**Dhruv Sharma**
Aspiring Software Engineer
Python Backend | Full Stack Developer


---


