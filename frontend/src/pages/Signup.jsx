import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await API.post("/auth/signup/", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
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

    