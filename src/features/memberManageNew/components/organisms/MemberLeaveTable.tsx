import CheckBox from "@/shared/components/atoms/inputs/CheckBox-Old";
import Table from "@/shared/components/organisms/table/Table";
import type { TableColumn } from "@/shared/types/tableTypes";
import { useMemo } from "react";

// --- Data Type ---
export interface MemberLeaveData {
  id: number; // Still needed for selection logic
  reason: string;
  leaveDate: string; // Should be in "YYYY/MM/DD" format
}

// --- Component Props ---
interface MemberLeaveTableProps {
  data: MemberLeaveData[];
  selectedIds: Set<number>;
  onSelectChange: (ids: Set<number>) => void;
}

// --- Column Definitions (Updated to match Figma) ---
// Removed the 'id' (순번) column as it's not in the Figma
const leaveColumns: TableColumn<MemberLeaveData>[] = [
  {
    key: "email",
    title: "이메일",
    width: "auto", // Takes remaining space
    align: "left", // Align reason left as in Figma
  },
  {
    key: "reason",
    title: "탈퇴사유",
    width: "auto", // Takes remaining space
    align: "left", // Align reason left as in Figma
  },
  {
    key: "leaveDate",
    title: "탈퇴일",
    width: "180px", // Adjusted width for "YYYY/MM/DD"
    align: "center",
  },
];

// --- The Component ---
const MemberLeaveTable = ({
  data,
  selectedIds,
  onSelectChange,
}: MemberLeaveTableProps) => {
  // Handle Checkbox Logic
  const handleSelectAll = (checked: boolean) => {
    onSelectChange(checked ? new Set(data.map((item) => item.id)) : new Set());
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    const newIds = new Set(selectedIds);
    if (checked) newIds.add(id);
    else newIds.delete(id);
    onSelectChange(newIds);
  };

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;
  const isIndeterminate =
    selectedIds.size > 0 && selectedIds.size < data.length; // Prepend selection column

  const columnsWithSelection: TableColumn<MemberLeaveData>[] = useMemo(
    () => [
      {
        key: "select",
        title: "",
        width: "60px",
        align: "center",
        render: (_value, item, index) => {
          if (index === -1) {
            // --- Header Row ---
            return (
              <CheckBox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleSelectAll}
                className="h-[18px] w-[18px]" // Example sizing
              />
            );
          }
          if (!item) return null; // --- Data Row ---
          return (
            <CheckBox
              checked={selectedIds.has(item.id)}
              onChange={(checked) => handleSelectItem(item.id, checked)}
              className="h-[18px] w-[18px]" // Example sizing
            />
          );
        },
      },
      ...leaveColumns, // Use the specific columns for this table
    ],
    [data, selectedIds, isAllSelected, isIndeterminate]
  );

  return (
    <Table
      columns={columnsWithSelection}
      data={data} // Add other table props as needed
    />
  );
};

export default MemberLeaveTable;
