import { MouseEvent } from "react";
import { cn } from "../../../utils/style";

interface PrimaryButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  title: string;
  type?: "button" | "submit" | "reset";
}

// 용도: 로그인, 회원 가입 모달 버튼
// #tag: #버튼 #로그인버튼

const PrimaryButton = ({
  onClick,
  disabled,
  className,
  title,
  type = "button",
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex-center",
        "h-[48px]",
        "w-[338px]",
        "rounded-[3px]",
        "bg-primary",
        "hover:bg-primary-focused",
        "disabled:bg-primary-disabled",
        "text-[15px]",
        "font-semibold",
        "text-white",
        "transition",
        className
      )}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
