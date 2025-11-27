import { ReactNode } from "react";
import { cn } from "../../../../utils/style";

interface TableProps {
  className?: string;
  children: ReactNode;
}

function Table({ className, children }: TableProps) {
  return (
    <table
      className={cn(
        `w-full max-w-[1044px]
        border-collapse`,
        className
      )}
    >
      {children}
    </table>
  );
}

export default Table;
