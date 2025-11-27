import { ReactNode } from "react";
import { cn } from "../../../../utils/style";

interface HeadTrProps {
  className?: string;
  children: ReactNode;
}

const HeadTr = ({ className, children }: HeadTrProps) => {
  return (
    <tr
      className={cn(
        `h-[41px] 
        border-[1px] border-transparent border-t-gray-500/50
        bg-gray-100`,
        className
      )}
    >
      {children}
    </tr>
  );
};

export default HeadTr;
