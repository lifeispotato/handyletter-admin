// src/shared/components/atoms/table/TableCell.tsx
import type { TableCellProps } from "@/shared/types/tableTypes";
import classNameMerge from "@/shared/classNameMerge";

const TableCell = ({ children, align = "left", className }: TableCellProps) => {
  const baseStyle =
    "font-pretendard h-[48px] py-[15px] px-[12px] align-middle text-[14px] font-medium text-[#636C73] truncate max-w-0";
  const alignStyle = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <td className={classNameMerge(baseStyle, alignStyle, className)}>
      {children}
    </td>
  );
};

export default TableCell;
