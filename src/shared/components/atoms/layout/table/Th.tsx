import { cn } from "../../../../utils/style";
import { ReactNode } from "react";

interface ThProps {
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  colSpan?: number;
}

const Th: React.FC<ThProps> = ({ className, children, style, colSpan }) => {
  return (
    <th className={cn(`text-left`, className)} style={style} colSpan={colSpan}>
      {children}
    </th>
  );
};

export default Th;
