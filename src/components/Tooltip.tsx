import React, { useId, useState } from "react";

type TooltipProps = {
  children: React.ReactNode; // the button or element that triggers tooltip
  text: string;
};

const Tooltip = ({ children, text }: TooltipProps) => {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {/* Trigger element */}
      <div aria-describedby={tooltipId} tabIndex={0} className="focus:outline-none">
        {children}
      </div>

      {/* Tooltip box */}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs bg-gray-900 text-white text-sm px-3 py-2 rounded-md shadow-lg z-10
          animate-fade-in"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
