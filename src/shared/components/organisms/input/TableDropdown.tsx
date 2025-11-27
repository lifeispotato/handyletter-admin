import { useState, useEffect, useRef, useMemo } from "react";
import PretendardText from "../../atoms/text/PretendardText";
import TableText from "../../atoms/text/TableText";
import { cn } from "../../../utils/style";

interface DropdownItem {
  value: string;
  label: string;
}

interface TableDropdownProps {
  onClick: (value: string | number) => void;
  list: DropdownItem[];
  selectedValue: string | number;
  className?: string;
  dropdownClassName?: string;
  selectedValueClassName?: string;
}

const TableDropdown: React.FC<TableDropdownProps> = ({
  onClick,
  list,
  selectedValue,
  className,
  dropdownClassName,
  selectedValueClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectedTitle = useMemo(() => {
    return list?.find((item) => item.value === selectedValue)?.label;
  }, [list, selectedValue]);

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 드롭다운 항목 선택 시 실행
  const handleSelect = (value: string | number) => {
    if (value !== selectedValue) {
      onClick(value);
      setIsOpen(false); // 선택 후 자동 닫기
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 필터 버튼 */}
      <div
        className={cn(
          `w-[77px] flex items-center justify-between cursor-pointer`,
          className
        )}
        onClick={toggleDropdown}
      >
        <TableText
          className={cn("text-gray-1400 font-semibold", selectedValueClassName)}
        >
          {selectedTitle}
        </TableText>
        <div
          className={`
            w-[28px] h-[28px]
            flex-center
            cursor-pointer
            rounded-[8px] border-[1px] border-line-200
            bg-white hover:bg-gray-50`}
        >
          <img
            src="/assets/admin/icons/ic_arrow_gray02.png"
            alt="드롭다운 화살표"
            className={`
              w-[18px] h-[18px]
              cursor-pointer
              transition-transform duration-300
              ${isOpen ? "-rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className={cn(
            `
            min-w-[113px] p-[10px]
            flex flex-col
            absolute top-[40px] left-0
            rounded-md bg-white shadow-md gap-[4px] z-10`,
            dropdownClassName
          )}
        >
          {list.map((item, index) => (
            <div
              key={index}
              className={`
                w-full h-[42px]
                px-[10px]
                flex items-center justify-between
                rounded-sm cursor-pointer hover:bg-gray-200`}
              onClick={() => {
                handleSelect(item.value);
              }}
            >
              <PretendardText
                className={`
                  text-[15px] font-medium
                  leading-[24.5px] tracking-[-0.408px]
                  cursor-pointer
                  ${
                    selectedValue === item.value
                      ? "text-gray-1400"
                      : "text-gray-1000"
                  }`}
              >
                {item?.label}
              </PretendardText>
              {selectedValue === item.value && (
                <img
                  src="/assets/admin/icons/ic_dropdown_check.png"
                  alt="체크 아이콘"
                  className="w-[18px] h-[18px]"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableDropdown;
