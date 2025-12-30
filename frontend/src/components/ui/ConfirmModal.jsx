export default function ConfirmModal({ open, onClose, onConfirm, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl w-80">
        <h3 className="text-white mb-4">{title}</h3>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 py-2 rounded-xl"
          >
            Confirm
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
