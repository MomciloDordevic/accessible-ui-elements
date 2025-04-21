import React, { useState } from "react";
import Toast, { ToastType } from "./Toast";

let toastId = 0;

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <>
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>

      {/* Temp demo buttons */}
      <div className="flex gap-2 mt-8">
        <button
          onClick={() => addToast("Success message!", "success")}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Show Success
        </button>
        <button
          onClick={() => addToast("Something went wrong!", "error")}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Show Error
        </button>
        <button
          onClick={() => addToast("FYI: This is a toast.", "info")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Show Info
        </button>
      </div>
    </>
  );
};

export default ToastContainer;
