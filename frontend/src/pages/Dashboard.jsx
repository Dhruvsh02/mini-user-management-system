import GlassCard from "../components/GlassCard";

export default function Dashboard() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">
          User Dashboard
        </h1>

        <p className="text-white/80 mb-2">
          Welcome to your dashboard
        </p>

        <p className="text-white/90">
          <span className="font-semibold">Role:</span> {role || "user"}
        </p>
      </GlassCard>
    </div>
  );
}
