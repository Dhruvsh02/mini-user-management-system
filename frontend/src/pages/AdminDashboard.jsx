import { useEffect, useState } from "react";
import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../services/adminApi";
import toast from "react-hot-toast";
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Mail,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const PAGE_SIZE = 10;

export default function AdminDashboard() {
  /* ---------------- STATE ---------------- */
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async (pageNo = 1) => {
    setLoading(true);
    try {
      const res = await getAllUsers(pageNo);
      setUsers(res.data.results || []);
      setTotalUsers(res.data.count || 0);
      setPage(pageNo);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH STATS ---------------- */
  const fetchStats = async () => {
    try {
      const res = await getAllUsers(1, true);
      const all = res.data.results || [];
      const active = all.filter((u) => u.is_active).length;
      setActiveUsers(active);
      setInactiveUsers(all.length - active);
    } catch {
      toast.error("Failed to load stats");
    }
  };

  useEffect(() => {
    fetchUsers(1);
    fetchStats();
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const handleActivate = async (id) => {
    try {
      await activateUser(id);
      toast.success("User activated");
      fetchUsers(page);
      fetchStats();
    } catch {
      toast.error("Activation failed");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateUser(id);
      toast.success("User deactivated");
      fetchUsers(page);
      fetchStats();
    } catch {
      toast.error("Deactivation failed");
    }
  };

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-white/70">
              User management & monitoring
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Users" value={totalUsers} icon={Users} />
          <StatCard title="Active Users" value={activeUsers} icon={UserCheck} />
          <StatCard title="Inactive Users" value={inactiveUsers} icon={UserX} />
        </div>

        {/* USERS LIST */}
        <h2 className="text-2xl font-bold text-white mb-4">Users</h2>

        <div className="space-y-4">
          {users.length === 0 && !loading && (
            <p className="text-white/70">No users found.</p>
          )}

          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 flex justify-between items-center text-white"
            >
              <div>
                <p className="font-semibold">{user.full_name}</p>
                <p className="text-sm text-white/70 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
              </div>

              <button
                disabled={loading}
                onClick={() => {
                  setSelectedUser(user);
                  setActionType(user.is_active ? "deactivate" : "activate");
                }}
                className={`px-4 py-2 rounded-xl ${
                  user.is_active ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {user.is_active ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end items-center gap-4 mt-6 text-white">
          <button
            disabled={page === 1}
            onClick={() => fetchUsers(page - 1)}
            className="px-4 py-2 bg-white/20 rounded-xl disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => fetchUsers(page + 1)}
            className="px-4 py-2 bg-white/20 rounded-xl disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white max-w-md">
            <div className="flex gap-3 mb-4">
              <AlertCircle />
              <p>
                Confirm to <b>{actionType}</b>{" "}
                <b>{selectedUser.email}</b>?
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-white/20 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  actionType === "activate"
                    ? handleActivate(selectedUser.id)
                    : handleDeactivate(selectedUser.id);
                  setSelectedUser(null);
                }}
                className={`px-4 py-2 rounded-xl ${
                  actionType === "activate"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
      <div className="flex justify-between mb-2">
        <Icon className="w-6 h-6" />
        <Sparkles className="w-5 h-5 text-white/60" />
      </div>
      <p className="text-white/70 text-sm">{title}</p>
      <h2 className="text-4xl font-bold">{value}</h2>
    </div>
  );
}
