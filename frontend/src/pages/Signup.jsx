import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import API from "../services/api";
import GlassCard from "../components/GlassCard.jsx";

export default function Signup() {
    const navigate = useNavigate();
    const [form, setform ] = useState({
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
        if (!form.password.length < 8) {
            err.password = "Password must be at least 8 characters";
        }
        return err;
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        const err = validate();
        if (Object.keys(err).length){
            setError("Please fill out all required fields correctly.");
            return;
        }

        try {
            setLoading(true);
            await API.post("/auth/signup/",{
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/70 hover:text-white"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-opacity-90 transition disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-white/80">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold underline hover:text-white"
          >
            Login
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}

    