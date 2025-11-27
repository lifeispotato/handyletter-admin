import classNameMerge from "../../../utils/classNameMerge";
import PretendardText from "./PretendardText";
import { ReactNode } from "react";

// 용도: 필터 제목
// #tag: #테이블 #텍스트 #filtertext

interface FilterTitleProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FilterTitle = ({ children, className = "", style }: FilterTitleProps) => {
  return (
    <PretendardText
      className={classNameMerge([
        "text-gray-700 text-[14px] leading-[22.75px] font-semibold",
        className,
      ])}
      style={{
        ...style,
      }}
    >
      {children}
    </PretendardText>
  );
};

export default FilterTitle;
