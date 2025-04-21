import React, { useState } from "react";

interface ToggleProps {
  label?: string;
  initial?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ label = "Toggle", initial = false }) => {
  const [enabled, setEnabled] = useState(initial);

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-800 font-medium text-gray-800 dark:text-gray-200">{label}</span>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
