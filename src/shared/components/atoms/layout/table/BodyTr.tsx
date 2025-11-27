// BodyTr.tsx
import { ReactNode, forwardRef, CSSProperties } from "react";
import { cn } from "../../../../utils/style";

interface BodyTrProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties; // ✅ style prop 추가
}

const BodyTr = forwardRef<HTMLTableRowElement, BodyTrProps>(
  ({ className, children, style }, ref) => {
    return (
      <tr
        ref={ref}
        style={style} // ✅ 전달받은 style 적용
        className={cn(
          `h-[59px] 
          border-[1px] border-l-0 border-r-0 border-line-200 
          bg-white`,
          className
        )}
      >
        {children}
      </tr>
    );
  }
);

export default BodyTr;
