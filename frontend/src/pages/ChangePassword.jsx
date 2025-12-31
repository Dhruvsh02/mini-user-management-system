import { useState } from "react";
import API from "../services/api";
import { Lock, Eye, EyeOff, KeyRound, ArrowLeft, Sparkles, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const ChangePassword = async () => {
        try {
            setLoading(true);
            await API.put("/auth/change-password/", {
                old_password: oldPassword,
                new_password: newPassword,
            });
            setMessage("Password changed successfully.");
            setIsSuccess(true);
            setOldPassword("");
            setNewPassword("");
        } catch {
            setMessage("Failed to change password.");
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-md text-white relative z-10 shadow-2xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 mb-4">
                        <KeyRound className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Change Password</h2>
                    <p className="text-white/70 text-sm">Update your account password</p>
                </div>

                {/* Current Password Input */}
                <div className="mb-5">
                    <label className="text-white/90 text-sm font-medium block mb-2">
                        Current Password
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white/80 transition-colors" />
                        <input
                            type={showOld ? "text" : "password"}
                            placeholder="Enter current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors focus:outline-none"
                        >
                            {showOld ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* New Password Input */}
                <div className="mb-6">
                    <label className="text-white/90 text-sm font-medium block mb-2">
                        New Password
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white/80 transition-colors" />
                        <input
                            type={showNew ? "text" : "password"}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors focus:outline-none"
                        >
                            {showNew ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <p className="text-white/50 text-xs mt-1 ml-1">Must be at least 8 characters</p>
                </div>

                {/* Message Display */}
                {message && (
                    <div
                        className={`mb-6 px-4 py-3 rounded-xl backdrop-blur-sm flex items-start gap-3 animate-in slide-in-from-top duration-300 ${
                            isSuccess
                                ? "bg-green-500/20 border border-green-400/50 text-green-100"
                                : "bg-red-500/20 border border-red-400/50 text-red-100"
                        }`}
                    >
                        {isSuccess ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        ) : (
                            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm">{message}</span>
                    </div>
                )}

                {/* Update Button */}
                <button
                    onClick={ChangePassword}
                    disabled={loading || !oldPassword || !newPassword}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:from-white/30 hover:to-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                        </>
                    ) : (
                        <>
                            <KeyRound className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Update Password
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}