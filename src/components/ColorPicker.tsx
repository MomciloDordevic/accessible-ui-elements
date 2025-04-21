import React, { useState } from "react";

const colors = [
  "#EF4444", // Red
  "#F59E0B", // Orange
  "#FBBF24", // Amber
  "#10B981", // Green
  "#3B82F6", // Blue
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#6B7280", // Gray
];

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div>
      <h2 className="mb-2 font-medium text-gray-800 dark:text-gray-200">
        Choose a Color:
      </h2>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              selectedColor === color
                ? "ring-2 ring-offset-2 ring-blue-500"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      {selectedColor && (
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
        </p>
      )}
    </div>
  );
};

export default ColorPicker;
