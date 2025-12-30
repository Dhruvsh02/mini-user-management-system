export default function Button({
  children,
  type = "primary",
  onClick,
  loading = false
}) {
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600"
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full py-2 rounded-xl text-white font-medium 
      ${styles[type]} transition-all flex items-center justify-center`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
