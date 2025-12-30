import { useEffect, useState } from "react";
import {
  getAllUsers,
  activateUser,
  deactivateUser
} from "../services/adminApi";
import { logout } from "../utils/logout";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_active).length;
  const inactiveUsers = users.filter(u => !u.is_active).length;

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null); // "activate" | "deactivate"

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.results);
    } catch (err) {
        toast.error("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActivate = async (id) => {
    setLoading(true);
    await activateUser(id);
    await fetchUsers();
    setLoading(false);
  };

  const handleDeactivate = async (id) => {
    setLoading(true);
    await deactivateUser(id);
    await fetchUsers();
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <h1 className="text-3xl font-bold text-white mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  
        <div className="backdrop-blur-xl bg-white/10 border border-white/20
                  rounded-xl p-5 text-white">
            <p className="text-sm opacity-80">Total Users</p>
                <h2 className="text-3xl font-bold">{totalUsers}</h2>
        </div>

        <div className="backdrop-blur-xl bg-green-500/10 border border-green-400/30
                  rounded-xl p-5 text-white">
            <p className="text-sm opacity-80">Active Users</p>
                <h2 className="text-3xl font-bold text-green-400">
                {activeUsers}
                </h2>
        </div>

        <div className="backdrop-blur-xl bg-red-500/10 border border-red-400/30
                  rounded-xl p-5 text-white">
            <p className="text-sm opacity-80">Inactive Users</p>
                <h2 className="text-3xl font-bold text-red-400">
                {inactiveUsers}
                </h2>
        </div>

      </div>


      <div className="grid gap-4">
        {users.map(user => (
          <div
            key={user.id}
            className="flex justify-between items-center
                       backdrop-blur-lg bg-white/10
                       border border-white/20
                       rounded-xl p-4 text-white"
          >
            <div>
              <p className="font-semibold">{user.full_name}</p>
              <p className="text-sm opacity-80">{user.email}</p>
              <p className="text-sm">
                Status:
                <span className={user.is_active ? "text-green-400" : "text-red-400"}>
                  {" "}{user.is_active ? "Active" : "Inactive"}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              {user.is_active ? (
                <button
                  disabled={loading}
                  onClick={() => {
                    setSelectedUser(user);
                    setActionType("deactivate");
                  }}
                  className="px-4 py-2 rounded-lg
                             bg-red-500/80 hover:bg-red-600
                             transition"
                >
                  Deactivate
                </button>
              ) : (
                <button
                  disabled={loading}
                  onClick={() => {
                    setSelectedUser(user);
                    setActionType("activate");
                  }}
                  className="px-4 py-2 rounded-lg
                             bg-green-500/80 hover:bg-green-600
                             transition"
                >
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
        {selectedUser && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20
                    rounded-2xl p-6 w-[90%] max-w-md text-white">
      
                    <h2 className="text-xl font-semibold mb-4">
                        Confirm Action
                    </h2>

                    <p className="mb-6 text-sm opacity-90">
                        Are you sure you want to
                        <span className="font-bold">
                        {" "}{actionType}
                        </span>{" "}
                            the user <b>{selectedUser.email}</b>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setSelectedUser(null);
                                    setActionType(null);
                        }}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                            >
                            Cancel
                        </button>

                        <button
                            onClick={async () => {
                            if (actionType === "activate") {
                                await handleActivate(selectedUser.id);
                            } else {
                                await handleDeactivate(selectedUser.id);
                            }
                            setSelectedUser(null);
                            setActionType(null);
                            }}
                            className={`px-4 py-2 rounded-lg ${
                                actionType === "activate"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                              }`}
                            >
                        Confirm
                        </button>
                   </div>
                </div>
            </div>
            )}
      </div>
    </div>
  );
}
