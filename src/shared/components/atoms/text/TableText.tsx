import { cn } from "../../../utils/style";
import PretendardText from "./PretendardText";
import { ReactNode, HTMLAttributes } from "react";

// 용도: 테이블 내부 텍스트 스타일
// #tag: #테이블 #텍스트 #tabletext

interface TableTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const TableText = ({ className, children, ...props }: TableTextProps) => {
  return (
    <PretendardText
      title={typeof children === "string" ? children : undefined}
      className={cn(
        "text-gray-500",
        "text-[14px]",
        "font-medium",
        "leading-[22.75px]",
        "overflow-hidden",
        "whitespace-nowrap",
        "truncate",
        className
      )}
      {...props}
    >
      {children}
    </PretendardText>
  );
};

export default TableText;
