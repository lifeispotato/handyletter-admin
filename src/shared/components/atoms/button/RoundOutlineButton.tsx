import { MouseEvent } from "react";
import { cn } from "../../../utils/style";

interface RoundOutlineButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  title: string;
  isNegative?: boolean;
}

// 용도: 주로 삭제, 수정페이지 이동 버튼으로 쓰임
// #tag: #버튼 #삭제버튼 #수정버튼

const RoundOutlineButton = ({
  onClick,
  disabled,
  className,
  title,
  isNegative,
}: RoundOutlineButtonProps) => {
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
        "rounded-[50px]",
        "border-[1px]",
        "bg-white",
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
      {title}
    </button>
  );
};

export default RoundOutlineButton;
