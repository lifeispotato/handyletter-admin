import { MouseEvent } from "react";
import { cn } from "../../../utils/style";

interface FillButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  title: string;
  icon?: string;
}

// 용도: 주로 저장 버튼으로 사용
// #tag: #버튼 #저장버튼

const FillButton = ({
  onClick,
  disabled,
  className,
  title,
  icon,
}: FillButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "bg-gray-600",
        "hover:bg-gray-700",
        "flex",
        "h-[49px]",
        "w-fit",
        "items-center",
        "justify-center",
        "rounded-[4px]",
        "px-[20px]",
        "py-[12px]",
        "!text-[15px]",
        "font-semibold",
        "text-white",
        "transition",
        "disabled:bg-gray-300",
        "disabled:text-gray-600",
        className
      )}
    >
      {icon && <img src={icon} alt="" className="w-[18px] h-[18px] mr-[8px]" />}
      {title}
    </button>
  );
};

export default FillButton;
