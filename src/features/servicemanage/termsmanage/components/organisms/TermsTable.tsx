import Table from "@/shared/components/organisms/table/Table";
import type { TermsData } from "@/api/terms/terms.types";
import type { TableColumn } from "@/shared/types/tableTypes";
import CheckBox from "@/shared/components/atoms/inputs/CheckBox-Old";
import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_DETAIL_VARIANT } from "@/shared/styles/button";
import { useMemo } from "react";
import { formatDate } from "@/shared/utils/dateUtils";

interface TermsTableProps {
  termsList: TermsData[];
  selectedIds: number[];
  onSelectItem: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onNavigate: (id: number) => void;
}

const TERMS_TABLE_COLUMNS = (
  selectedIds: number[],
  onSelectItem: (id: number, checked: boolean) => void,
  onSelectAll: (checked: boolean) => void,
  onNavigate: (id: number) => void,
  totalCount: number
): TableColumn<TermsData>[] => {
  const isAllSelected = totalCount > 0 && selectedIds.length === totalCount;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < totalCount;

  return [
    {
      key: "select",
      title: "",
      width: "40px",
      align: "center",
      render: (_, terms, index) => (
        <div className="flex justify-center">
          {index === -1 ? ( // 헤더 체크박스
            <CheckBox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(checked) => onSelectAll(checked)}
              className="h-[18px] w-[18px]"
            />
          ) : (
            // 행 체크박스
            <CheckBox
              checked={selectedIds.includes(terms.id)}
              onChange={(checked) => onSelectItem(terms.id, checked)}
              className="h-[18px] w-[18px]"
            />
          )}
        </div>
      ),
    },
    {
      key: "title",
      title: "제목",
      width: "auto",
    },
    {
      key: "updatedAt",
      title: "수정일",
      width: "220px",
      align:"left",
      render: (_, terms, index) => {
        if (index === -1) return "수정일";

        return formatDate(terms.updatedAt);
      },
    },
    {
      key: "detail",
      title: "상세보기",
      width: "100px",
      align: "center",
      render: (_, terms, index) => {
        if (index === -1) return "상세보기";

        return (
          <div className="flex items-center justify-center">
            <IconButton
              icon="plus_white"
              className={BUTTON_DETAIL_VARIANT.default}
              onClick={() => onNavigate(terms.id)}
              iconClassName="h-[12px] w-[12px]"
            >
              보기
            </IconButton>
          </div>
        );
      },
    },
  ];
};

const TermsTable = ({
  termsList,
  selectedIds,
  onSelectItem,
  onSelectAll,
  onNavigate,
}: TermsTableProps) => {
  const columns = useMemo(
    () =>
      TERMS_TABLE_COLUMNS(
        selectedIds,
        onSelectItem,
        onSelectAll,
        onNavigate,
        termsList.length
      ),
    [selectedIds, onSelectItem, onSelectAll, onNavigate, termsList.length]
  );

  if (!termsList || termsList.length === 0) {
    return (
      <div className="border-system-200 bg-white p-4">
        <div className="flex h-32 items-center justify-center text-gray-500">
          데이터가 없습니다.
        </div>
      </div>
    );
  }
  return (
    <Table
      columns={columns}
      data={termsList}
      className="border-system-200 bg-white"
    />
  );
};

export default TermsTable;
