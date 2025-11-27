import type { TableRowProps } from "@/shared/types/tableTypes";
import classNameMerge from "@/shared/classNameMerge";

const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <tr
      className={classNameMerge(
        "border-system-200 border-b last:border-b-0",
        className
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
