import { cn } from "../../../../utils/style";
import PretendardText from "./../../text/PretendardText";

interface EmptyViewTextProps {
  title?: string;
  className?: string;
}

const EmptyViewText = ({ title, className }: EmptyViewTextProps) => {
  return (
    <PretendardText
      className={cn(
        `w-full max-w-[1044px] h-[400px] flex-center font-semibold text-[16px] text-gray-600`,
        className
      )}
    >
      {title || "불러올 데이터가 없습니다."}
    </PretendardText>
  );
};

export default EmptyViewText;
