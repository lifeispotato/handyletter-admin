import IconImg from "@/shared/components/atoms/image/IconImg";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
// REMOVE THIS LINE: import "react-day-picker/dist/style.css"; // No longer needed
// In CustomDatePicker.tsx (or main entry point)
import classNameMerge from "@/shared/classNameMerge";
import "@/shared/styles/day-picker-custom.css"; // Adjust path

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
}

// --- NEW HELPER FUNCTION ---
// Formats a Date object as YYYY-MM-DD using local date parts
const formatDateToYYYYMMDD = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
// --- END HELPER ---
const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  isDisabled = false,
  className = "",
}: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDayClick = (day: Date | undefined) => {
    onChange(day ?? null);
    setIsOpen(false);
  };

  // --- EDITED: Use the helper function for display ---
  const displayValue = value ? formatDateToYYYYMMDD(value) : placeholder;
  // --- END EDIT ---

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={classNameMerge("relative", className)}>
      <div
        // --- EDITED: Removed fixed width, ensure w-full is applied ---
        className={classNameMerge([
          // Selectively apply base input styles EXCEPT width
          "h-[48px] px-[15px] py-[13px]", // Height, Padding
          "font-pretendard text-[15px]", // Font
          "border-system-400 rounded-[4px] border", // Border, Rounding
          "transition-colors duration-200", // Transition
          "focus:border-primary focus:outline-none", // Focus styles (will apply when div has focus)
          // Add w-full to ensure it fills container
          "w-full",
          // Keep layout and interaction styles
          "flex items-center justify-between",
          isDisabled
            ? "border-system-400 text-system-500 cursor-not-allowed bg-gray-100" // Disabled styles adjusted
            : "hover:border-system-500 cursor-pointer bg-white", // Normal state styles
        ])}
        // --- END EDIT ---
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-disabled={isDisabled}
      >
        <span
          className={`font-pretendard text-[15px] ${
            value ? "text-system-700" : "text-system-500"
          }`}
        >
          {displayValue}
        </span>
        <IconImg
          src="celendar_gray"
          alt="Open calendar"
          size="md"
          className={isDisabled ? "text-gray-400" : "text-gray-500"}
        />
      </div>

      {isOpen && !isDisabled && (
        <div className="absolute top-full left-0 z-10 mt-1 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
          <DayPicker
            mode="single"
            selected={value ?? undefined}
            onSelect={handleDayClick}
            initialFocus={isOpen}
            // --- ADDED THIS classNames PROP ---
          />
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
