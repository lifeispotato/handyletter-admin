import { useEffect, useRef, useState } from "react";
import PretendardText from "../../atoms/text/PretendardText";
import { cn } from "../../../utils/style";
import { InputDropdownType } from "../../../types";

interface DropdownProps {
  className?: string;
  selectBoxClassName?: string;
  selectedItemTextClassName?: string;
  listTextClassName?: string;
  placeholder?: string;
  selectedItem?: InputDropdownType | string | null;
  list: InputDropdownType[];
  customIcon?: string;
  itemIndex?: number;
  onChange: (item: InputDropdownType | string | null, index?: number) => void;
  labelKey: string;
  isSearch?: boolean;
  disabled?: boolean;
  isSelectedDropdown?: boolean;
}

// 용도: 드롭다운
// #tag: #드롭다운 #선택박스

const Dropdown = ({
  className,
  selectBoxClassName,
  selectedItemTextClassName,
  listTextClassName,
  placeholder,
  selectedItem,
  list,
  customIcon,
  itemIndex,
  onChange,
  labelKey,
  isSearch,
  disabled = false,
  isSelectedDropdown = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBtnRef = useRef<HTMLDivElement>(null);
  const dropdownSelectBoxRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownSelectBoxRef.current &&
        !dropdownSelectBoxRef.current.contains(event.target as Node) &&
        dropdownBtnRef.current &&
        !dropdownBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };
  const closeDropdown = () => setIsOpen(false);

  return (
    <div ref={dropdownBtnRef} className={cn(`relative w-full`, className)}>
      {/* Select Box */}
      <div
        className={cn(
          `
          h-[48px] w-full
          relative
          flex items-center justify-between
          rounded-[4px] border border-gray-400 bg-white
          px-[15px] py-[13px]`,
          disabled ? "cursor-not-allowed bg-gray-100" : "cursor-pointer",
          selectBoxClassName
        )}
        onClick={toggleDropdown}
      >
        <PretendardText
          className={`text-[15px] font-medium leading-[21.25px] ${
            selectedItem ? "text-gray-700" : "text-gray-500"
          } ${selectedItemTextClassName}`}
        >
          {selectedItem && typeof selectedItem === "object"
            ? selectedItem[labelKey] || placeholder
            : selectedItem === null && isSelectedDropdown
            ? "선택 안함"
            : selectedItem || placeholder}
        </PretendardText>
        <img
          className={`h-[18px] w-[18px] transition-transform duration-300 ${
            isOpen ? "-rotate-180" : "rotate-0"
          } ${disabled ? "opacity-50" : ""}`}
          alt="dropdown arrow"
          src={customIcon || "/assets/admin/icons/ic_arrow_gray02.png"}
        />
      </div>

      {/* Dropdown List */}
      <div
        ref={dropdownSelectBoxRef}
        className={`
          w-full 
          flex flex-col 
          p-[13px]
          absolute top-[53px] z-10
          custom-scroll shadow-custom
          overflow-y-auto rounded-[8px] bg-white
          transition-all duration-300 
          ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 hidden"}`}
      >
        {isSelectedDropdown && (
          <PretendardText
            className={`px-[10px] py-[10px] text-gray-1400 text-[15px] font-normal cursor-pointer rounded-[8px] leading-[21.25px] hover:bg-gray-200 ${listTextClassName}`}
            onClick={() => {
              onChange(null, itemIndex);
              closeDropdown();
            }}
          >
            선택 안함
          </PretendardText>
        )}
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item, index) => (
            <PretendardText
              key={index}
              className={`
                px-[10px] py-[10px]
                text-gray-1400 text-[15px] font-normal
                cursor-pointer rounded-[8px]
                leading-[21.25px] hover:bg-gray-200 ${listTextClassName}`}
              onClick={() => {
                const selectedValue = isSearch ? item[labelKey] : item;
                if (selectedValue !== undefined && selectedValue !== null) {
                  const finalValue =
                    typeof selectedValue === "number" ||
                    typeof selectedValue === "boolean"
                      ? selectedValue.toString()
                      : selectedValue;
                  onChange(finalValue, itemIndex);
                  closeDropdown();
                }
              }}
            >
              {item[labelKey] || ""}
            </PretendardText>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
