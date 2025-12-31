export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:shadow-3xl hover:-translate-y-0.5 ${className}`}>
      {children}
    </div>
  );
}