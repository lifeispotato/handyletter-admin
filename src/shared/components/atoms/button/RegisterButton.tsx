import { MouseEvent } from "react";
import { cn } from "../../../utils/style";

interface RegisterButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  title: string;
}

// 용도: 관리자 회원가입용 버튼
// #tag: #버튼 #회원가입버튼

const RegisterButton = ({
  onClick,
  disabled,
  className,
  title,
}: RegisterButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex-center",
        "text-gray-1000",
        "h-[48px]",
        "w-[338px]",
        "rounded-[3px]",
        "border-[1px]",
        "border-gray-400",
        "bg-line-100",
        "text-[15px]",
        "text-gray-700",
        "font-semibold",
        "transition",
        "hover:bg-gray-100",
        "disabled:bg-line-200",
        "disabled:text-gray-400",
        className
      )}
    >
      {title}
    </button>
  );
};

export default RegisterButton;
