import { cn } from "./../../../../utils/style";
import { ReactNode } from "react";

interface DetailBoxProps {
  className?: string;
  children: ReactNode;
}

function DetailBox({ children, className }: DetailBoxProps) {
  return (
    <div
      className={cn(
        `w-full max-w-[1044px] p-[40px] relative
        rounded-[10px] border border-line-200
        bg-white mb-5`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default DetailBox;
