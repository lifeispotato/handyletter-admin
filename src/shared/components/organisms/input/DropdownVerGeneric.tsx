import { useEffect, useRef, useState } from "react";
import PretendardText from "../../atoms/text/PretendardText";
import { cn } from "../../../utils/style";

interface DropdownProps<T> {
  className?: string;
  selectBoxClassName?: string;
  selectedItemTextClassName?: string;
  listTextClassName?: string;
  placeholder?: string;
  selectedItem?: T | string | null;
  list: T[];
  customIcon?: string;
  itemIndex?: number;
  onChange: (item: T | null, index?: number) => void;
  labelKey: keyof T;
  disabled?: boolean;
  isSelectedDropdown?: boolean;
}

// 용도: 서버에서 받아온 List 전체를 드롭다운으로 표시해야할 때 사용
// #tag: #드롭다운 #선택박스

const DropdownVerGeneric = <T,>({
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
  disabled = false,
  isSelectedDropdown = false,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBtnRef = useRef<HTMLDivElement>(null);
  const dropdownSelectBoxRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);

  const getLabel = (item: T | string | null | undefined): string => {
    if (item && typeof item === "object") {
      const value = item[labelKey];
      return typeof value === "string" || typeof value === "number"
        ? value.toString()
        : "";
    }
    if (item === null && isSelectedDropdown) return "선택 안함";
    return typeof item === "string" ? item : placeholder || "";
  };

  return (
    <div ref={dropdownBtnRef} className={cn("relative w-[338px]", className)}>
      <div
        className={cn(
          `h-[48px] w-full relative flex items-center justify-between
           rounded-[4px] border border-gray-400 bg-white px-[15px] py-[13px]`,
          disabled ? "cursor-not-allowed bg-gray-100" : "cursor-pointer",
          selectBoxClassName
        )}
        onClick={toggleDropdown}
      >
        <PretendardText
          className={cn(
            "text-[15px] font-medium leading-[21.25px]",
            selectedItem ? "text-gray-700" : "text-gray-500",
            selectedItemTextClassName
          )}
        >
          {getLabel(selectedItem)}
        </PretendardText>
        <img
          className={cn(
            "h-[18px] w-[18px] transition-transform duration-300",
            isOpen ? "-rotate-180" : "rotate-0",
            disabled ? "opacity-50" : ""
          )}
          alt="dropdown arrow"
          src={customIcon || "/assets/admin/icons/ic_arrow_gray02.png"}
        />
      </div>

      <div
        ref={dropdownSelectBoxRef}
        className={cn(
          `w-full flex flex-col p-[13px] absolute top-[53px] z-10
           custom-scroll shadow-custom overflow-y-auto rounded-[8px] bg-white
           transition-all duration-300`,
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 hidden"
        )}
      >
        {isSelectedDropdown && (
          <PretendardText
            className={cn(
              `px-[10px] py-[10px] text-gray-1400 text-[15px] font-normal
                 cursor-pointer rounded-[8px] leading-[21.25px] hover:bg-gray-200`,
              listTextClassName
            )}
            onClick={() => {
              onChange(null, itemIndex);
              closeDropdown();
            }}
          >
            선택 안함
          </PretendardText>
        )}
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            const value = item[labelKey];
            const label =
              typeof value === "string" || typeof value === "number"
                ? value.toString()
                : "";

            return (
              <PretendardText
                key={index}
                className={cn(
                  `px-[10px] py-[10px] text-gray-1400 text-[15px] font-normal
                 cursor-pointer rounded-[8px] leading-[21.25px] hover:bg-gray-200`,
                  listTextClassName
                )}
                onClick={() => {
                  onChange(item, itemIndex);
                  closeDropdown();
                }}
              >
                {label}
              </PretendardText>
            );
          })}
      </div>
    </div>
  );
};

export default DropdownVerGeneric;
