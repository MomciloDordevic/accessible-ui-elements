import React, { useState } from "react";

interface RangeSliderProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="range-slider" className="block text-sm font-medium mb-2">
        {label}: <span className="font-bold">{value}</span>
      </label>
      <input
        id="range-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                   dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
      />
    </div>
  );
};

export default RangeSlider;
