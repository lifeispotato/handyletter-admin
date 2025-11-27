import { ReactNode } from "react";
import { cn } from "./../../../../utils/style";

interface AlertDetailBoxProps {
  className?: string;
  children: ReactNode;
}

function AlertDetailBox({ children, className }: AlertDetailBoxProps) {
  return (
    <div
      className={cn(
        `w-full max-w-[1044px] p-[20px] relative
        rounded-[10px]
        bg-[#FF3E440D]`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default AlertDetailBox;
