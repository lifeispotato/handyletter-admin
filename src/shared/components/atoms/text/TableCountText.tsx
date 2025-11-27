import PretendardText from "./PretendardText";

interface TableCountTextProps {
  title: string;
  count?: number | string;
}

function TableCountText({ title, count }: TableCountTextProps) {
  return (
    <div className="flex items-center gap-[7px]">
      <PretendardText className="text-gray-400 text-[14px] font-semibold">
        전체 {title} 수
      </PretendardText>
      <PretendardText className="text-gray-700 text-[14px] font-semibold">
        {count || "000"}
      </PretendardText>
    </div>
  );
}

export default TableCountText;
