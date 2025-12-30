import { useState } from "react";
import API from "../services/api";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
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
              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
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