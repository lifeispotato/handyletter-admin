import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import arrowIcon from '../../assets/icons/ic_16_arrow.svg';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  defaultLabel?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Dropdown = ({ 
  options, 
  defaultLabel = "최신순", 
  onChange,
  className 
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelectedLabel(option.label);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      
      {/* 1. Trigger Button (btn_round) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center cursor-pointer justify-center gap-2.5 border border- transition-colors",
          // Dimensions: 80x39, Radius: 18px
          "w-20 h-[39px] rounded-[18px] border border-[#E6E8EB]",
          // Styling: Bg Gray-2 (#E6E8EB), Text Gray-800 (#27272A)
          "bg-white text-[#27272A] hover:bg-gray-200",
          // Font: Pretendard SemiBold 15px
          "font-sans font-semibold text-[15px] leading-[24.5px]"
        )}
      >
        <span>{selectedLabel}</span>
        
        {/* Arrow Icon (Rotates when open) */}
        <img 
          src={arrowIcon} 
          alt="" 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* 2. Dropdown Menu (Absolute Positioned) */}
      {isOpen && (
        <div className={cn(
          "absolute right-0 mt-2 origin-top-right z-50 bg-white",
          // Dimensions: w-125, h-auto (fitting content, min-h as per spec if needed)
          "w-[125px] rounded-md",
          // Padding: 18px top/bottom, 20px left/right
          "py-[18px] px-5",
          // Shadow: 0px 0px 8px 0px #5959592E
          "shadow-[0px_0px_8px_0px_#5959592E]"
        )}>
          <div className="flex flex-col gap-[15px]">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={cn(
                  "text-left w-full font-sans text-[15px] text-[#27272A] hover:text-primary transition-colors",
                  // Optional: Highlight selected item
                  selectedLabel === option.label ? "font-semibold text-primary" : "font-normal"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};