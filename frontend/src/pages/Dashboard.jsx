import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import GlassCard from "../components/GlassCard";
import { logout } from "../utils/logout";
import toast from "react-hot-toast";
import { User, Mail, Shield, Calendar, CheckCircle, XCircle, Edit, Lock, LogOut, Sparkles } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Welcome Header */}
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Welcome, {user.full_name}
            </h1>
          </div>
          <p className="text-white/70 text-lg ml-15">
            Here's your account overview
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <GlassCard className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/30 to-blue-600/30 backdrop-blur-md border border-blue-400/30 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Profile</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <Mail className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-sm font-medium">Email</p>
                  <p className="text-white font-medium truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <Shield className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white/60 text-sm font-medium">Role</p>
                  <p className="text-white font-medium capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Account Status Card */}
          <GlassCard className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400/30 to-green-600/30 backdrop-blur-md border border-green-400/30 flex items-center justify-center">
                {user.is_active ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <XCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-semibold text-white">Account Status</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  {user.is_active ? (
                    <CheckCircle className="w-5 h-5 text-green-300" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-300" />
                  )}
                  <span
                    className={`text-lg font-bold ${
                      user.is_active ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-white/60 text-sm">
                  Your account is currently {user.is_active ? "active" : "inactive"}
                </p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <Calendar className="w-5 h-5 text-white/70 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white/60 text-sm font-medium">Member Since</p>
                  <p className="text-white font-medium">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Quick Actions Card */}
          <GlassCard className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400/30 to-purple-600/30 backdrop-blur-md border border-purple-400/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Quick Actions</h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/profile")}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:from-white/30 hover:to-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <Edit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/change-password")}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:from-white/30 hover:to-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Change Password
              </button>

              <button
                onClick={logout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-md border border-red-400/50 text-white font-semibold hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Logout
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}