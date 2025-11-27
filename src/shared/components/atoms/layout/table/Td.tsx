import { cn } from "../../../../utils/style";
import { ReactNode } from "react";

export interface TdProps {
  className?: string;
  children?: ReactNode;
  rowSpan?: number;
  colSpan?: number;
  style?: React.CSSProperties;
}

const Td = ({ className, children, rowSpan, colSpan, style }: TdProps) => {
  return (
    <td
      className={cn(
        `text-left 
        h-[59px] 
        relative`,
        className
      )}
      rowSpan={rowSpan}
      colSpan={colSpan}
      style={style}
    >
      {children}
    </td>
  );
};

export default Td;
