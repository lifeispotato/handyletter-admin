import { MouseEvent } from "react";
import { cn } from "../../../utils/style";

interface TableDetailButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  title?: string;
  isNoPlusIcon?: boolean;
}

// 용도: 테이블에서 상세 페이지 이동 시 사용
// #tag: #버튼 #상세보기버튼 #테이블버튼

const TableDetailButton = ({
  onClick,
  disabled,
  className,
  title,
  isNoPlusIcon,
}: TableDetailButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex-center",
        "bg-gray-600",
        "h-[29px]",
        "w-fit",
        "rounded-[4px]",
        "px-[8px]",
        "py-[3px]",
        "!text-[14px]",
        "!font-medium",
        "leading-[22.75px]",
        "text-white",
        "transition",
        "hover:bg-gray-900",
        className
      )}
    >
      {!isNoPlusIcon && "+"} {title || "보기"}
    </button>
  );
};

export default TableDetailButton;
