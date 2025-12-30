import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";
import RootRedirect from "./components/RootRedirect";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<RootRedirect />} />
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <ProtectedLayout>
                <AdminDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
              <Profile />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        {/* change password */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
              <ChangePassword />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
