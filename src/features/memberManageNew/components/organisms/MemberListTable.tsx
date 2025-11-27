import { useMemo } from "react";
import Table from "@/shared/components/organisms/table/Table";
import type { TableColumn } from "@/shared/types/tableTypes";
import CheckBox from "@/shared/components/atoms/inputs/CheckBox-Old";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import { BUTTON_DETAIL_VARIANT } from "@/shared/styles/button";

// --- Types ---
// Updated to match the columns in the Figma design
export interface MockMember {
  id: number;
  hospitalName: string; // Added '병원명'
  name: string;
  phone: string;
  email: string;
}

interface MemberListTableProps {
  data: MockMember[];
  selectedIds: Set<number>;
  onSelectChange: (ids: Set<number>) => void;
  onViewDetails: (id: number) => void;
}

// --- Column Definitions (Refactored to match Figma) ---
const getColumns = (
  selectedIds: Set<number>,
  onSelectItem: (id: number, checked: boolean) => void,
  onSelectAll: (checked: boolean) => void,
  onViewDetails: (id: number) => void,
  totalCount: number
): TableColumn<MockMember>[] => {
  const isAllSelected = totalCount > 0 && selectedIds.size === totalCount;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < totalCount;

  return [
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
              onChange={onSelectAll}
              className="h-[18px] w-[18px]"
            />
          );
        } // --- Data Row ---
        return (
          <CheckBox
            checked={selectedIds.has(item.id)}
            onChange={(checked) => onSelectItem(item.id, checked)}
            className="h-[18px] w-[18px]"
          />
        );
      },
    }, // --- Columns updated to match Figma ---
    {
      key: "name", // Added from Figma
      title: "가입 유형",
      width: "auto", // Takes remaining space
      align: "left",
    },
    {
      key: "email", // Added from Figma
      title: "이메일",
      width: "auto", // Takes remaining space
      align: "left",
    },
    {
      key: "createdAt",
      title: "가입일",
      width: "auto",
      align: "center",
    },
    {
      key: "details",
      title: "상세보기",
      width: "120px",
      align: "left",
      render: (_value, item, index) => {
        if (index === -1) {
          return "상세보기";
        }
        return (
          <BasicButton
            className={`${BUTTON_DETAIL_VARIANT.default}`}
            onClick={() => onViewDetails(item.id)}
          >
            + 보기
          </BasicButton>
        );
      },
    },
  ];
};

// --- The Component ---
const MemberListTable = ({
  data,
  selectedIds,
  onSelectChange,
  onViewDetails,
}: MemberListTableProps) => {
  // --- Handle Checkbox Logic (Unchanged) ---
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map((item) => item.id));
      onSelectChange(allIds);
    } else {
      onSelectChange(new Set());
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    const newIds = new Set(selectedIds);
    if (checked) {
      newIds.add(id);
    } else {
      newIds.delete(id);
    }
    onSelectChange(newIds);
  }; // Memoize columns to prevent re-calculation on every render

  const columns = useMemo(
    () =>
      getColumns(
        selectedIds,
        handleSelectItem,
        handleSelectAll,
        onViewDetails,
        data.length
      ),
    [selectedIds, handleSelectItem, handleSelectAll, onViewDetails, data.length]
  );

  return (
    <Table
      columns={columns}
      data={data} // Add other table props as needed
    />
  );
};

export default MemberListTable;
