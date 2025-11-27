import { cn } from "../../../utils/style";
import PretendardText from "./PretendardText";
import { ReactNode } from "react";

// 용도: 디테일 페이지 속 정보 내용
// #tag: #텍스트 #상세페이지 #디테일페이지정보내용

interface DetailInfoTextProps {
  children: ReactNode;
  className?: string;
}

const DetailInfoText = ({ children, className }: DetailInfoTextProps) => {
  return (
    <PretendardText
      className={cn(
        "text-[15px]",
        "font-normal",
        "text-gray-600",
        "max-w-[744px]",
        "whitespace-pre-wrap",
        className
      )}
    >
      {children}
    </PretendardText>
  );
};

export default DetailInfoText;
