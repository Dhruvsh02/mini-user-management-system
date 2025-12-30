import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, admin = false }) {
    const token = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!token){
        return <Navigate to="/login" />;
    }

    if (admin && role !== "admin"){
        return <Navigate to="/dashboard" />;
    }

    return children;

}