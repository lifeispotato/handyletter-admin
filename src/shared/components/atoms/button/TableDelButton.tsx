import { cn } from "../../../utils/style";

// 용도: 테이블에서 단일 삭제 시 사용
// #tag: #버튼 #삭제버튼 #테이블버튼

interface TableDelButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
}

const TableDelButton = ({
  onClick,
  disabled,
  className,
  title,
}: TableDelButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex-center",
        "h-[29px]",
        "w-fit",
        "rounded-[4px]",
        "border-[1px]",
        "border-negative",
        "bg-white",
        "px-[8px]",
        "py-[3px]",
        "!text-[14px]",
        "font-medium",
        "text-negative",
        "transition",
        "hover:bg-negative/10",
        className
      )}
    >
      {title || "삭제"}
    </button>
  );
};

export default TableDelButton;
