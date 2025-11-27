import { ReactNode } from "react";
import { cn } from "../../../../utils/style";

interface TableTopProps {
  className?: string;
  children: ReactNode;
}

function TableTop({ children, className }: TableTopProps) {
  return (
    <div
      className={cn(
        `w-full max-w-[1044px]
        flex items-center justify-between 
        mb-[20px]`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default TableTop;
