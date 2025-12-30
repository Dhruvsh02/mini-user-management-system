import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import GlassCard from "../components/GlassCard";
import { logout } from "../utils/logout";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
    try{
        const res = await API.get("/auth/me/");
        setUser(res.data);
    } catch (err) {
        toast.error("Failed to load user data. Please login again.");
        localStorage.clear();
        navigate("/login");
    } finally {
        setLoading(false);
    }
    };
    
    fetchUser();
  }, [navigate]);
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            Loading dashboard...
        </div>
    );
    }

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Welcome */}
      <h1 className="text-4xl font-bold mb-8">
        Welcome, {user.full_name}
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-white/80">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-white/80">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        </GlassCard>

        {/* Account Status */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-2">Account Status</h2>
          <p
            className={`font-semibold ${
              user.is_active ? "text-green-300" : "text-red-300"
            }`}
          >
            {user.is_active ? "Active" : "Inactive"}
          </p>
          <p className="text-white/70 text-sm mt-2">
            Joined on {new Date(user.created_at).toLocaleDateString()}
          </p>
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/profile")}
              className="w-full py-2 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-opacity-90 transition"
            >
              Edit Profile
            </button>
            <button onClick={() => navigate("/change-password")}
              className="w-full py-2 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-opacity-90 transition"
            >
              Change Password
            </button>
            <button
              onClick={logout}
              
              className="w-full py-2 rounded-xl bg-red-500/80 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
