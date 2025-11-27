import { MouseEvent } from "react";
import { cn } from "../../../utils/style";

interface OutlineButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  title: string;
  isNegative?: boolean;
  icon?: string;
}

// 용도: 주로 삭제, 수정페이지 이동 버튼으로 쓰임
// #tag: #버튼

const OutlineButton = ({
  onClick,
  disabled,
  className,
  title,
  isNegative,
  icon,
}: OutlineButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex-center",
        isNegative ? "text-negative" : "border-gray-500",
        isNegative ? "text-negative" : "text-gray-600",
        "h-[42px]",
        "w-fit",
        "rounded-[4px]",
        "border-[1px]",
        "px-[20px]",
        "py-[10px]",
        "text-[16px]",
        "font-semibold",
        "transition",
        "hover:bg-gray-100",
        "disabled:text-gray-300",
        "disabled:bg-line-200",
        "disabled:border-line-300",
        className
      )}
    >
      {icon && <img src={icon} alt="" className="w-[18px] h-[18px] mr-[8px]" />}
      {title}
    </button>
  );
};

export default OutlineButton;
