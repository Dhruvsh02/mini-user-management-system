export default function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-white mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-xl bg-white/10 
        text-white placeholder-white/50 border 
        ${error ? "border-red-400" : "border-white/20"}
        focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />

      {error && (
        <p className="text-red-400 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
