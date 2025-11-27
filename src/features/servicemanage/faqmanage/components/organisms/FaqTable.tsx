import Table from "@/shared/components/organisms/table/Table";
import type { FaqData } from "@/api/faq/faq.types";
import type { TableColumn } from "@/shared/types/tableTypes";
import CheckBox from "@/shared/components/atoms/inputs/CheckBox-Old";
import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_DETAIL_VARIANT } from "@/shared/styles/button";
import { formatDate } from "@/shared/utils/dateUtils";
import { useMemo } from "react";

interface FaqTableProps {
  faqList: FaqData[];
  selectedIds: number[];
  onSelectItem: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onNavigate: (id: number) => void;
}
const FAQ_TABLE_COLUMNS = (
  selectedIds: number[],
  onSelectItem: (id: number, checked: boolean) => void,
  onSelectAll: (checked: boolean) => void,
  onNavigate: (id: number) => void,
  totalCount: number
): TableColumn<FaqData>[] => {
  const isAllSelected = totalCount > 0 && selectedIds.length === totalCount;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < totalCount;

  return [
    {
      key: "select",
      title: "",
      width: "40px",
      align: "center",
      render: (_, faq, index) => (
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
              checked={selectedIds.includes(faq.id)}
              onChange={(checked) => onSelectItem(faq.id, checked)}
              className="h-[18px] w-[18px]"
            />
          )}
        </div>
      ),
    },
    {
      key: "title",
      title: "제목",
      width: "300px",
    },
    {
      key: "adminEmail",
      title: "관리자 이메일",
      width: "auto",
      align:"center"
    },
    {
      key: "createdAt",
      title: "게시일",
      width: "auto",
      render: (_, faq, index) => {
        if (index === -1) return "게시일";
        return formatDate(faq.createdAt);
      },
    },
    {
      key: "detail",
      title: "상세보기",
      width: "100px",
      align: "center",
      render: (_, faq, index) => {
        if (index === -1) return "상세보기";

        return (
          <div className="flex items-center justify-center">
            <IconButton
              icon="plus_white"
              className={BUTTON_DETAIL_VARIANT.default}
              onClick={() => onNavigate(faq.id)}
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
const FaqTable = ({
  faqList,
  selectedIds,
  onSelectItem,
  onSelectAll,
  onNavigate,
}: FaqTableProps) => {
  const columns = useMemo(
    () =>
      FAQ_TABLE_COLUMNS(
        selectedIds,
        onSelectItem,
        onSelectAll,
        onNavigate,
        faqList.length
      ),
    [selectedIds, onSelectItem, onSelectAll, onNavigate, faqList.length]
  );

  if (!faqList || faqList.length === 0) {
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
      data={faqList}
      className="border-system-200 bg-white"
    />
  );
};

export default FaqTable;
