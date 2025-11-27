import type { TableProps } from "@/shared/types/tableTypes";
import classNameMerge from "@/shared/utils/classNameMerge";
import TableHeader from "@/shared/components/molecules/table/TableHeader";
import TableHeaderCell from "@/shared/components/atoms/table/TableHeaderCell";
import TableRow from "@/shared/components/molecules/table/TableRow";
import TableCell from "@/shared/components/atoms/table/TableCell";

const Table = <T extends Record<string, any>>({
  columns,
  data,
  className,
}: TableProps<T>) => {
  return (
    <div className={classNameMerge("border-system-200 bg-white", className)}>
      <table className="w-full">
        <TableHeader>
          {columns.map((column) => (
            <TableHeaderCell
              key={column.key}
              width={column.width as string}
              align={column.align}
            >
              {column.render ? column.render(null, {} as T, -1) : column.title}
            </TableHeaderCell>
          ))}
        </TableHeader>
        <tbody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell
                  key={`${rowIndex}-${column.key}`}
                  align={column.align}
                >
                  {column.render
                    ? column.render(item[column.key], item, rowIndex)
                    : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
