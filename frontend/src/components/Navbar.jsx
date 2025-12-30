import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="sticky top-0 z-50
                    backdrop-blur-xl bg-white/10
                    border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4
                      flex justify-between items-center text-white">

        {/* Left */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() =>
            navigate(role === "admin" ? "/admin" : "/dashboard")
          }
        >
          Mini User System
        </h1>

        {/* Right */}
        <div className="flex gap-6 items-center text-sm">

          {role === "admin" && (
            <Link to="/admin" className="hover:text-indigo-300">
              Admin
            </Link>
          )}

          <Link to="/dashboard" className="hover:text-indigo-300">
            Dashboard
          </Link>

          <Link to="/profile" className="hover:text-indigo-300">
            Profile
          </Link>

          <Link to="/change-password" className="hover:text-indigo-300">
            Change Password
          </Link>

          <button
            onClick={logout}
            className="bg-red-500/80 hover:bg-red-600
                       px-3 py-1 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
