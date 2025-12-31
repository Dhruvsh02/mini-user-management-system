import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";
import { Shield, LayoutDashboard, User, Lock, LogOut, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center text-white">
          {/* Left - Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() =>
              navigate(role === "admin" ? "/admin" : "/dashboard")
            }
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold group-hover:text-white/90 transition-colors">
              Mini User System
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2 items-center">
            {role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
              >
                <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Admin</span>
              </Link>
            )}

            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            >
              <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Profile</span>
            </Link>

            <Link
              to="/change-password"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            >
              <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Password</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 ml-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-md border border-red-400/50 hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-2 animate-in slide-in-from-top duration-300">
            {role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
              >
                <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Admin</span>
              </Link>
            )}

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            >
              <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            >
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Profile</span>
            </Link>

            <Link
              to="/change-password"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            >
              <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Change Password</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-md border border-red-400/50 hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-200 shadow-lg group"
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}