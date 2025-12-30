import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import GlassCard from "../components/GlassCard";

export default function AdminDashboard(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try{
            const res = await API.get("/admin/users/");
            setUsers(res.data.results);
        } catch(err){
            navigate("/login");
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleUserStatus = async (id, isActive) => {
        try{
            if (isActive){
                await API.post(`/admin/users/${id}/deactivate/`);
            } else {
                await API.post(`/admin/users/${id}/activate/`);
            }
            fetchUsers();
        } catch(err){
            alert("Action failed. Please try again.");
        }
    };

    if (loading){
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading admin dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-10">
            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>
            <GlassCard>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/30">
                                <th className="py-3">Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}
                                    className="border-b border-white/20 hover:bg-white/10">
                                    <td className="py-3">{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td 
                                        className={user.is_active ? "text-green-400" : "text-red-400"}>
                                        {user.is_active ? "Active" : "Inactive"}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleUserStatus(user.id, user.is_active)}
                                            className={`px-4 py-1 rounded-lg font-semibold ${
                                                user.is_active
                                                ? "bg-red-500/80 hover:bg-red-600"
                                                : "bg-green-500/80 hover:bg-green-600"
                                            }`}>
                                            {user.is_active ? "Deactivate" : "Activate"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}