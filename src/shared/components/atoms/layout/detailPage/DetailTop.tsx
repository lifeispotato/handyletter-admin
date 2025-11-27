import { cn } from "./../../../../utils/style";
import { ReactNode } from "react";

interface DetailTopProps {
  className?: string;
  children: ReactNode;
}

function DetailTop({ children, className }: DetailTopProps) {
  return (
    <div
      className={cn(
        `w-full max-w-[1044px] h-[42px]
        flex items-center justify-between
        mb-[18px] relative`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default DetailTop;
