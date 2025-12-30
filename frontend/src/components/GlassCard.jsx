export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6 ${className}`}>
      {children}
    </div>
  );
}
