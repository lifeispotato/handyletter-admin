import type { DormData } from "@/api/dorm/dorm.types";
import TableDelButton from "@/shared/components/atoms/button/TableDelButton";
import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import Table from "@/shared/components/organisms/table/Table";
import { BUTTON_DETAIL_VARIANT } from "@/shared/styles/button";
import type { TableColumn } from "@/shared/types/tableTypes";
import { useMemo } from "react";

interface DormTableProps {
  dormList: DormData[];
  onNavigate: (id: number) => void;
}

const DORM_TABLE_COLUMNS = (
  onNavigate: (id: number) => void
): TableColumn<DormData>[] => {
  return [
    {
      key: "name",
      title: "지역",
      width: "120px",
      render: (_, dorm, index) => {
        if (index === -1) return "지역";
        return (
          <div className="truncate max-w-[200px]" title={dorm.name}>
            {dorm.name}
          </div>
        );
      },
    },
    {
      key: "address",
      title: "유형",
      width: "88px",
      render: (_, dorm, index) => {
        if (index === -1) return "유형";
        return (
          <div className="truncate" title={dorm.address}>
            유형
          </div>
        );
      },
    },
    {
      key: "phoneNumber",
      title: "제목",
      width: "150px",
      render: (_, dorm, index) => {
        if (index === -1) return "제목";
        return <span>{dorm.phoneNumber}</span>;
      },
    },

    {
      key: "price",
      title: "가격",
      width: "150px",
      align: "center",
      render: (_, dorm, index) => {
        if (index === -1) return "가격";
        return <span>{dorm.price.toLocaleString()}원</span>;
      },
    },

    {
      key: "price",
      title: "후기",
      width: "150px",
      align: "center",
      render: (_, dorm, index) => {
        if (index === -1) return "후기";
        return <span>{dorm.price.toLocaleString()}원</span>;
      },
    },
    {
      key: "isHidden",
      title: "숨김",
      width: "60px",
      align: "center",
      render: (_, _dorm, index) => {
        if (index === -1) return "숨김";
        return (
          <TableDelButton
            title={"숨김"}
            className={`px-[12px] py-[6px] text-[12px]`}
            onClick={() => {}}
          />
        );
      },
    },
    {
      key: "detail",
      title: "상세보기",
      width: "100px",
      align: "center",
      render: (_, dorm, index) => {
        if (index === -1) return "상세보기";

        return (
          <div className="flex items-center justify-center">
            <IconButton
              icon="plus_white"
              className={BUTTON_DETAIL_VARIANT.default}
              onClick={() => onNavigate(dorm.id)}
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

const DormTable = ({ dormList, onNavigate }: DormTableProps) => {
  const columns = useMemo(
    () => DORM_TABLE_COLUMNS(onNavigate),
    [onNavigate, dormList.length]
  );

  if (!dormList || dormList.length === 0) {
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
      data={dormList}
      className="border-system-200 bg-white"
    />
  );
};

export default DormTable;
