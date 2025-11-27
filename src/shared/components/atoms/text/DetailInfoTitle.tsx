import { cn } from "../../../utils/style";
import PretendardText from "./PretendardText";
import { ReactNode } from "react";

// 용도: 디테일 페이지 속 정보 제목
// #tag: #텍스트 #상세페이지 #디테일페이지정보제목

interface DetailInfoTitleProps {
  children: ReactNode;
  className?: string;
  isRequired?: boolean;
}

const DetailInfoTitle = ({
  children,
  className,
  isRequired,
}: DetailInfoTitleProps) => {
  return (
    <PretendardText
      className={cn(
        "flex",
        "text-[15px]",
        "leading-[22px]",
        "font-semibold",
        "text-label-title",
        "min-w-[200px]",
        "w-[200px]",
        className
      )}
    >
      {children}
      {isRequired && "*"}
    </PretendardText>
  );
};

export default DetailInfoTitle;
