import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile(){
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchpProfile = async () => {
            try{
                const res = await API.get("/auth/me/");
                setUser(res.data);
                setFullName(res.data.full_name);
            } catch (err){
                setMessage("Failed to load profile.");
            }
        };
        fetchpProfile();
    }, []);

    const updateProfile = async () => {
        try{
            await API.put("/auth/profile/", {
                full_name: fullName,
            });
            setMessage("Profile updated successfully.");
        }
        catch (err){
            setMessage("Failed to update profile.");
        }   
    };

    if (!user) {
        return <p className="text-white p-6">Loading...</p>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-md text-white">
              <h2 className="text-2xl font-bold mb-4">My Profile</h2>
              <p className="text-sm opacity-80 mb-2">
                Email: {user.email}
              </p>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                    onClick={updateProfile}
                    className="px-4 py-2 rounded-lg bg-blue-500/80 hover:bg-blue-600 transition"
                >
                    Update Profile
                </button>
                {message && (
                    <p className="mt-4 text-sm opacity-90">{message}</p>
                )}
            </div>
        </div>
    );
}