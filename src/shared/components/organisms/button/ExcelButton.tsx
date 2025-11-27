import { useState, useRef, useEffect } from "react";
import PretendardText from "../../atoms/text/PretendardText";
import { cn } from "../../../utils/style";

interface ExcelButtonProps {
  onSelectClick?: () => void;
  onAllClick?: () => void;
  disabled?: boolean;
  className?: string;
  exceptCheckDownload?: boolean;
  isWhite?: boolean;
  btnText?: string;
}

const ExcelButton: React.FC<ExcelButtonProps> = ({
  onSelectClick,
  onAllClick,
  disabled,
  className,
  exceptCheckDownload,
  isWhite,
  btnText,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleClick = (callback?: () => void) => {
    if (callback) callback();
    closeDropdown();
  };

  return (
    <div ref={dropdownRef} className="relative w-fit">
      <button
        disabled={disabled}
        onClick={() => {
          if (exceptCheckDownload) {
            handleClick(onAllClick);
          } else {
            toggleDropdown();
          }
        }}
        className={cn(
          `h-[42px] w-fit 
          flex-center gap-[4px] 
          rounded-[50px] px-[14px] py-[10px] 
          bg-gray-700 transition hover:bg-gray-500 disabled:bg-gray-300`,
          isWhite && "bg-white border border-gray-500 hover:bg-gray-100/50",
          className
        )}
      >
        <img
          src={
            isWhite
              ? "/assets/admin/icons/ic_download_gray.png"
              : "/assets/admin/icons/ic_download_white.png"
          }
          alt=""
          className="h-[18px] w-[18px]"
        />
        <PretendardText
          className={cn(
            "text-[14px] font-medium text-white disabled:text-gray-400",
            isWhite && "text-gray-500"
          )}
        >
          {btnText ? btnText : "엑셀 다운로드"}
        </PretendardText>
        {exceptCheckDownload ? null : (
          <img
            src={
              isWhite
                ? "/assets/admin/icons/ic_arrow_gray02.png"
                : "/assets/admin/icons/ic_arrow_gray.png"
            }
            alt=""
            className={`
            h-[16px] w-[16px]
            transition duration-300
            ${isOpen ? "-rotate-180" : "rotate-0"}`}
          />
        )}
      </button>

      {isOpen && (
        <div
          className={`
            w-max
            flex flex-col
            absolute top-[46px] z-50
            bg-white
            rounded-[3px]
            p-[10px]
            shadow-lg
            transform transition-all duration-300`}
        >
          <button
            onClick={() => handleClick(onSelectClick)}
            className="flex-center rounded-[3px] p-[10px] hover:bg-gray-200"
          >
            <PretendardText className="text-[15px] font-medium text-gray-700">
              선택 항목 다운로드
            </PretendardText>
          </button>
          <button
            onClick={() => handleClick(onAllClick)}
            className="flex-center rounded-[3px] p-[10px] hover:bg-gray-200"
          >
            <PretendardText className="text-[15px] font-medium text-gray-700">
              전체 항목 다운로드
            </PretendardText>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExcelButton;
