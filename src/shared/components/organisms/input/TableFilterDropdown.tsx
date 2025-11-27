import { useState, useEffect, useRef, useMemo } from "react";
import classNameMerge from "../../../utils/classNameMerge";
import PretendardText from "../../atoms/text/PretendardText";

interface DropdownItem {
  label: string;
  value: string;
}

interface TableFilterDropdownProps {
  onClick: (value: { label: string; value: string }) => void;
  list: DropdownItem[];
  selectedValue: {
    label: string;
    value: string;
  };
  wrapperClassName?: string;
  btnClassName?: string;
  listClassName?: string;
}

const TableFilterDropdown: React.FC<TableFilterDropdownProps> = ({
  onClick,
  list,
  selectedValue,
  wrapperClassName = "",
  btnClassName = "",
  listClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectedTitle = useMemo(() => {
    return list?.find((item) => item.value === selectedValue.value)?.label;
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
  const handleSelect = (value: { label: string; value: string }) => {
    if (value.value !== selectedValue.value) {
      onClick(value);
      setIsOpen(false); // 선택 후 자동 닫기
    }
  };

  return (
    <div
      className={classNameMerge(["relative w-fit h-fit", wrapperClassName])}
      ref={dropdownRef}
    >
      {/* 필터 버튼 */}
      <div
        className={classNameMerge([
          "w-[107px] flex items-center justify-between gap-[10px] cursor-pointer",
          btnClassName,
        ])}
        onClick={toggleDropdown}
      >
        <PretendardText
          className={classNameMerge([
            "text-[15px] text-gray-700 font-semibold leading-[22px] whitespace-nowrap",
          ])}
        >
          {selectedTitle}
        </PretendardText>
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
          className={classNameMerge([
            "w-fit h-fit p-[10px] rounded-md bg-white shadow-md z-10",
            "flex flex-col absolute top-[40px] right-0 gap-[4px]",
            listClassName,
          ])}
        >
          {list.map((item, index) => (
            <div
              key={index}
              className={classNameMerge([
                "min-w-max h-[42px] px-[10px] relative",
                "flex items-center gap-[4px]",
                "rounded-sm cursor-pointer hover:bg-gray-200",
              ])}
              onClick={() => {
                handleSelect(item);
              }}
            >
              <PretendardText className="text-[15px] font-medium leading-[21.25px] cursor-pointer whitespace-nowrap">
                {item?.label}
              </PretendardText>
              {selectedValue.value === item.value && (
                <img
                  className="w-[18px] h-[18px]"
                  src="/assets/admin/icons/ic_dropdown_check.png"
                  alt="체크 아이콘"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableFilterDropdown;
