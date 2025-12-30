import { useState } from "react";
import API from "../services/api";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [message, setMessage] = useState("");

    const ChangePassword = async () => {
        try{
            await API.post("/auth/change-password/", {
                old_password: oldPassword,
                new_password: newPassword,
            });
            setMessage("Password changed successfully.");
            setOldPassword("");
            setNewPassword("");
        } catch{
            setMessage("Failed to change password.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-md text-white">
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              <div className="relative mb-3">
              <input
                type={showOld ? "text" : "password"}
                placeholder="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
                <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/70 hover:text-white"
                >
                    {showOld ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative mb-4">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
                <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/70 hover:text-white"
                >
                    {showNew ? "Hide" : "Show"}
                </button>
              </div>
              <button
                onClick={ChangePassword}
                className="px-4 py-2 rounded-lg bg-blue-500/80 hover:bg-blue-600 transition"
              >
                Update Password
              </button>
              {message && (
                <p className="mt-4 text-sm opacity-90">{message}</p>
              )}
            </div>
        </div>
    );
}