import { useState, useRef, useEffect } from "react";
import type { DropdownProps } from "../../types/buttonTypes";
import BasicButton from "../atoms/button/BasicButton";
import IconImg from "../atoms/image/IconImg";
import classNameMerge from "../../utils/classNameMerge";

const Dropdown = <T extends Record<string, unknown>>({
  placeholder = "드롭다운 선택해주세요",
  selectedItem,
  list,
  labelKey,
  isDisabled = false,
  onChange,
  selectBoxClassName,
  selectedItemTextClassName,
  listTextClassName,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭으로 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 텍스트 가져오기 (간소화된 함수)
  const getText = (item: T | null) => {
    if (!item) return placeholder;
    if (labelKey) return String(item[labelKey]);
    return String(item);
  };

  // 선택 처리
  const handleSelect = (item: T, index: number) => {
    onChange(item, index);
    setIsOpen(false);
  };

  // 선택된 항목인지 확인 (간소화)
  const isSelected = (item: T) => {
    if (!selectedItem) return false;
    if (labelKey) return selectedItem[labelKey] === item[labelKey];
    return selectedItem === item;
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* 드롭다운 버튼 */}
      <BasicButton
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        isDisabled={isDisabled}
        className={classNameMerge(
          "border-system-400 focus:border-primary focus:text-system-700 relative h-[48px] w-[338px] rounded-[4px] border px-[15px] py-[13px] text-left transition-all duration-200 focus:outline-none",
          isDisabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-system-500",
          isOpen ? "border-system-500 bg-gray-50" : "",
          selectBoxClassName
        )}
      >
        <div className="flex w-full items-center justify-between">
          <span
            className={classNameMerge(
              "font-pretendard text-[15px] leading-[21.25px]",
              selectedItem ? "text-gray-900" : "text-[#808991]",
              selectedItemTextClassName
            )}
          >
            {getText(selectedItem as T | null)}
          </span>
          <IconImg
            src="ic_inner_arrow"
            alt="ic_inner_arrow"
            size="md"
            className={classNameMerge(
              "h-[16px] w-[16px] transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </div>
      </BasicButton>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <div className="animate-slideDown absolute z-50 mt-1 w-full">
          <div className="w-[338px] rounded-[3px] border border-gray-200 bg-white px-[10px] py-[10px] shadow-lg">
            <ul className="custom-scrollbar max-h-[300px] overflow-y-auto py-1">
              {list.length === 0 ? (
                <li className="px-4 py-3 text-center text-gray-500">
                  <span className="font-pretendard text-[15px]">
                    선택할 항목이 없습니다
                  </span>
                </li>
              ) : (
                list.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(item, index)}
                    className={classNameMerge(
                      "flex cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-gray-100",
                      isSelected(item)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    )}
                  >
                    <span
                      className={classNameMerge(
                        "font-pretendard text-[15px] leading-[21.25px]",
                        listTextClassName
                      )}
                    >
                      {getText(item)}
                    </span>
                    {isSelected(item) && (
                      <IconImg
                        src="ic_dropdown_check"
                        alt="ic_dropdown_check"
                        size="md"
                        className="h-[16px] w-[16px]"
                      />
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {/* 스타일 */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #b0b8c1;
          border-radius: 9px;
          min-height: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
