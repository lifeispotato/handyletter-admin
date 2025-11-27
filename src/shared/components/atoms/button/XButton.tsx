import { useState, MouseEvent } from "react";
import { cn } from "../../../utils/style";

interface XButtonProps {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isDark?: boolean;
}

// 용도: x 버튼
// #tag: #버튼 #x버튼

const XButton = ({ className, onClick, disabled, isDark }: XButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  const baseSrc = isDark
    ? "/assets/admin/icons/ic_x_dark.png"
    : "/assets/admin/icons/ic_x.png";
  const hoverSrc = "/assets/admin/icons/ic_x_hover.png";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={isHover ? hoverSrc : baseSrc}
        className={cn(
          "h-[30px] w-[30px] cursor-pointer transition-opacity",
          className
        )}
        alt="닫기"
      />
    </button>
  );
};

export default XButton;
