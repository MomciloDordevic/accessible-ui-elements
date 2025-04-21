import React, { useState, useRef } from "react";

const tabs = [
  { id: "tab-1", label: "Overview", content: "This is the overview tab." },
  { id: "tab-2", label: "Details", content: "Here are some more details." },
  { id: "tab-3", label: "Settings", content: "Adjust your settings here." },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(prevIndex);
      tabRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="Sample Tabs" className="flex space-x-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 rounded-t-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
              ${
                activeTab === index
                  ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-white border-b-0"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={tab.id}
          hidden={activeTab !== index}
          className="p-4 border border-t-0 rounded-b-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
