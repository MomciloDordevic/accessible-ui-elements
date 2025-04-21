import { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        className="px-2 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Previous month"
      >
        ‹
      </button>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        className="px-2 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  );

  const renderDaysOfWeek = () => {
    const days = [];
    const start = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-xs font-semibold text-center text-gray-500 dark:text-gray-400">
          {format(addDays(start, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        days.push(
          <button
            key={day.toString()}
            onClick={() => setSelectedDate(day)}
            className={`text-sm p-2 w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto
              ${!isCurrentMonth ? "text-gray-400 dark:text-gray-600" : ""}
              ${isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100 dark:hover:bg-blue-800"}
            `}
            aria-label={format(day, "do MMMM yyyy")}
          >
            {format(day, "d")}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day.toString()} className="grid grid-cols-7">{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
