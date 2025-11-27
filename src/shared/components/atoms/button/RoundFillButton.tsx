import { cn } from "./../../../utils/style";

interface RoundFillButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title: string;
}

// 용도: 주로 추가페이지 이동 버튼으로 쓰임
// #tag: #버튼 #추가버튼

const RoundFillButton = ({
  onClick,
  disabled,
  className,
  title,
}: RoundFillButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex-center",
        "bg-gray-700",
        "hover:bg-gray-600",
        "h-[42px]",
        "w-fit",
        "rounded-[50px]",
        "px-[14px]",
        "py-[10px]",
        "text-[16px]",
        "font-medium",
        "text-white",
        "transition",
        "disabled:bg-line-200",
        "disabled:text-gray-400",
        className
      )}
    >
      {title}
    </button>
  );
};

export default RoundFillButton;
