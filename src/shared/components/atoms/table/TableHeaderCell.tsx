import type { TableHeaderCellProps } from "@/shared/types/tableTypes";
import classNameMerge from "@/shared/classNameMerge";

const TableHeaderCell = ({
  children,
  align = "left",
  width,
  className,
}: TableHeaderCellProps) => {
  const baseStyle =
    "font-pretendard text-[14px] font-medium text-[#778088] py-[9px] px-[12px] align-middle";
  const alignStyle = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <th
      className={classNameMerge(baseStyle, alignStyle, className)}
      style={{ width }}
    >
      {children}
    </th>
  );
};

export default TableHeaderCell;
