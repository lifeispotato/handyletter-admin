import type { TableHeaderProps } from "@/shared/types/tableTypes";
import classNameMerge from "@/shared/classNameMerge";

const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <thead>
      <tr
        className={classNameMerge(
          "border-system-200 bg-system-100 h-[41px] border-t",
          className
        )}
      >
        {children}
      </tr>
    </thead>
  );
};

export default TableHeader;
