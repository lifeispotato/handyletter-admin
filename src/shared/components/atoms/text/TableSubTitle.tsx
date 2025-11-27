import classNameMerge from "../../../utils/classNameMerge";
import PretendardText from "./PretendardText";
import { ReactNode } from "react";

// 용도: 테이블 부제목
// #tag: #테이블 #텍스트 #tabletext

interface TableSubTitleProps {
  children: ReactNode;
  className?: string;
}

const TableSubTitle = ({ children, className = "" }: TableSubTitleProps) => {
  return (
    <PretendardText
      className={classNameMerge([
        "text-gray-700 text-[24px] leading-[100%] font-bold",
        className,
      ])}
    >
      {children}
    </PretendardText>
  );
};

export default TableSubTitle;
