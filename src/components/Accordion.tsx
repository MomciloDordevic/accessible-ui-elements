import React, { useState, useId } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="w-full rounded-md border border-gray-300 bg-white shadow-sm overflow-hidden">
      <h3 className="border-b border-gray-200">
        <button
          id={buttonId}
          className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {title}
          <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
            ▼
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="p-4 text-gray-700 break-words overflow-hidden"
      >
        <div className="w-full break-words whitespace-normal overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
