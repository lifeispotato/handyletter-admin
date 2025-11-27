import { HTMLAttributes } from "react";

type PretendardTextProps = HTMLAttributes<HTMLDivElement>;

// 용도: Pretendard text
// #tag: #텍스트 #Pretendard

const PretendardText = (props: PretendardTextProps) => {
  return <div className="font-[Pretendard]" {...props} />;
};

export default PretendardText;
