import { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/API";
import GlassCard from "../components/GlassCard.jsx";

export default function Login() {
    const navigate = useNavigate();
    const [form, setform ] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState();
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const res = await API.post("/auth/login/", form);
            // store JWT + role 
            localStorage.setItem("access", res.data.token);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("role", res.data.role);
            
            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch(err) {
          setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <GlassCard className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Welcome Back
                </h1>
                {error && (
                    <div className="bg-red-500/20 border-red-400 text-red-100 px-4 py-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    /> 
                    <button 
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-white/70 mt-4">
                    Don't have an account? 
                    <Link
                    to="/signup"
                    className="font-semibold underline hover:text-white"
                    >
                        Sign Up
                    </Link>
                </p>
            </GlassCard>
        </div>
    );
}