import { cn } from "../../../utils/style";
import PretendardText from "./PretendardText";
import { ReactNode } from "react";

// 용도: 디테일 페이지 제목 텍스트
// #tag: #텍스트 #상세페이지 #디테일페이지제목

interface DetailPageTitleProps {
  children: ReactNode;
  className?: string;
}

const DetailPageTitle = ({ children, className }: DetailPageTitleProps) => {
  return (
    <PretendardText
      className={cn(
        "text-[18px]",
        "font-bold",
        "text-gray-700",
        "leading-[25px]",
        "tracking-[-0.3%]",
        "mb-[30px]",
        className
      )}
    >
      {children}
    </PretendardText>
  );
};

export default DetailPageTitle;
