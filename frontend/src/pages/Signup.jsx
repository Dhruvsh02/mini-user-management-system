import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import API from "../services/api";
import GlassCard from "../components/GlassCard.jsx";
import { Mail, Lock, Eye, EyeOff, UserPlus, User, Sparkles } from "lucide-react";

export default function Signup() {
    const navigate = useNavigate();
    const [form, setform] = useState({
        full_name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const err = {};
        if (!form.full_name) {
            err.full_name = "Full name is required";
        }
        if (!form.email) {
            err.email = "Email is required";
        }
        if (form.password.length < 8) {
            err.password = "Password must be at least 8 characters";
        }
        return err;
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();

        if (Object.keys(err).length) {
            setError(err);
            return;
        }

        try {
            setLoading(true);
            await API.post("/auth/signup/", {
                full_name: form.full_name,
                email: form.email,
                password: form.password
            });
            toast.success("Account created successfully! Please login.");
            navigate("/login");
        } catch (err) {
            toast.error("Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <GlassCard className="w-full max-w-md relative z-10 backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
                {/* Header with icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-white/70 text-sm">
                        Sign up to get started with your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm flex items-start gap-3 animate-in slide-in-from-top duration-300">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name Input */}
                    <div className="space-y-2">
                        <label className="text-white/90 text-sm font-medium block">
                            Full Name
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white/80 transition-colors" />
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Enter your full name"
                                value={form.full_name}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-white/90 text-sm font-medium block">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white/80 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-white/90 text-sm font-medium block">
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white/80 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:from-white/30 hover:to-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating account...
                            </>
                        ) : (
                            <>
                                Sign Up
                                <UserPlus className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-center text-white/70 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-white hover:text-white/90 underline underline-offset-2 decoration-white/40 hover:decoration-white/70 transition-all"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </GlassCard>
        </div>
    );
}