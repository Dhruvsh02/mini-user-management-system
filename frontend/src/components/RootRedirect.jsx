import { Navigate } from "react-router-dom";

export default function RootRedirect() {
    const token = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!token){
        return <Navigate to="/login" replace />;
    }
    if (role === "admin") {
        return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
}