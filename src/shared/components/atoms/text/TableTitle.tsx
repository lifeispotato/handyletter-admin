import { cn } from "../../../utils/style";
import PretendardText from "./PretendardText";
import { ReactNode } from "react";

// 용도: 테이블 제목
// #tag: #테이블 #텍스트 #tabletext

interface TableTitleProps {
  children: ReactNode;
  className?: string;
}

const TableTitle = ({ children, className }: TableTitleProps) => {
  return (
    <PretendardText
      className={cn(
        `text-black text-[32px] font-semibold mb-[10px]`,
        className
      )}
    >
      {children}
    </PretendardText>
  );
};

export default TableTitle;
