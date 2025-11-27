import type { TodayBrandData } from "@/api/newsletter/todayBrand.types";
import TableDelButton from "@/shared/components/atoms/button/TableDelButton";
import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import Table from "@/shared/components/organisms/table/Table";
import { BUTTON_DETAIL_VARIANT } from "@/shared/styles/button";
import type { TableColumn } from "@/shared/types/tableTypes";
import { useMemo } from "react";

type NewsletterType = "TODAY_BRAND" | "SHORT_FORM" | "STORY";

interface TodayBrandTableProps {
  todayBrandList: TodayBrandData[];
  onNavigate: (id: number, type: NewsletterType) => void;
  onToggleHidden: (id: number, isHidden: boolean) => void;
  newsletterType: NewsletterType;
}

const TODAY_BRAND_TABLE_COLUMNS = (
  onNavigate: (id: number, type: NewsletterType) => void,
  onToggleHidden: (id: number, isHidden: boolean) => void,
  newsletterType: NewsletterType
): TableColumn<TodayBrandData>[] => {
  const baseColumns: TableColumn<TodayBrandData>[] = [
    {
      key: "title",
      title:
        newsletterType === "TODAY_BRAND"
          ? "콘텐츠 제목"
          : newsletterType === "SHORT_FORM"
          ? "숏품 제목"
          : "영상 제목",
      width: "300px",
      render: (_, todayBrand, index) => {
        if (index === -1)
          return newsletterType === "TODAY_BRAND"
            ? "콘텐츠 제목"
            : newsletterType === "SHORT_FORM"
            ? "숏품 제목"
            : "영상 제목";
        return (
          <div className="truncate max-w-[300px]" title={todayBrand.title}>
            {todayBrand.title}
          </div>
        );
      },
    },
    {
      key: "publishedAt",
      title: "발행일",
      width: "120px",
      align: "center",
      render: (_, todayBrand, index) => {
        if (index === -1) return "발행일";
        const date = new Date(todayBrand.publishedAt);
        const year = date.getFullYear().toString().slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
      },
    },
  ];

  if (newsletterType === "TODAY_BRAND") {
    return [
      ...baseColumns,
      {
        key: "editorName",
        title: "에디터",
        width: "120px",
        align: "center",
        render: (_, todayBrand, index) => {
          if (index === -1) return "에디터";
          return <span>{todayBrand.editorName}</span>;
        },
      },
      {
        key: "likeCount",
        title: "좋아요 수",
        width: "100px",
        align: "center",
        render: (_, todayBrand, index) => {
          if (index === -1) return "좋아요 수";
          return <span>{String(todayBrand.likeCount).padStart(2, "0")}</span>;
        },
      },
      {
        key: "commentCount",
        title: "댓글 수",
        width: "100px",
        align: "center",
        render: (_, todayBrand, index) => {
          if (index === -1) return "댓글 수";
          return (
            <span>{String(todayBrand.commentCount).padStart(2, "0")}</span>
          );
        },
      },
      {
        key: "isHidden",
        title: "숨김",
        width: "120px",
        align: "center",
        render: (_, todayBrand, index) => {
          if (index === -1) return "숨김";
          return (
            <TableDelButton
              title={todayBrand.isHidden ? "숨김해제" : "숨김"}
              className={`px-[12px] py-[6px] text-[12px]`}
              onClick={() =>
                onToggleHidden(todayBrand.id, !todayBrand.isHidden)
              }
            />
          );
        },
      },
      {
        key: "detail",
        title: "상세보기",
        width: "100px",
        align: "center",
        render: (_, todayBrand, index) => {
          if (index === -1) return "상세보기";

          return (
            <div className="flex items-center justify-center">
              <IconButton
                icon="plus_white"
                className={BUTTON_DETAIL_VARIANT.default}
                onClick={() =>
                  onNavigate(todayBrand.id, todayBrand.newsletterType)
                }
                iconClassName="h-[12px] w-[12px]"
              >
                보기
              </IconButton>
            </div>
          );
        },
      },
    ];
  }

  if (newsletterType === "SHORT_FORM") {
    return [
      ...baseColumns,
      {
        key: "isHidden",
        title: "숨김",
        width: "120px",
        align: "center",
        render: (_, todayBrand, index) => {
          if (index === -1) return "숨김";
          return (
            <TableDelButton
              title={todayBrand.isHidden ? "숨김해제" : "숨김"}
              className={`px-[12px] py-[6px] text-[12px]`}
              onClick={() =>
                onToggleHidden(todayBrand.id, !todayBrand.isHidden)
              }
            />
          );
        },
      },
      {
        key: "detail",
        title: "상세보기",
        width: "100px",
        align: "center",
        render: (_, todayBrand, index) => {
          if (index === -1) return "상세보기";

          return (
            <div className="flex items-center justify-center">
              <IconButton
                icon="plus_white"
                className={BUTTON_DETAIL_VARIANT.default}
                onClick={() =>
                  onNavigate(todayBrand.id, todayBrand.newsletterType)
                }
                iconClassName="h-[12px] w-[12px]"
              >
                보기
              </IconButton>
            </div>
          );
        },
      },
    ];
  }

  return [
    ...baseColumns,
    {
      key: "editorName",
      title: "에디터",
      width: "120px",
      align: "center",
      render: (_, todayBrand, index) => {
        if (index === -1) return "에디터";
        return <span>{todayBrand.editorName}</span>;
      },
    },
    {
      key: "isHidden",
      title: "숨김",
      width: "120px",
      align: "center",
      render: (_, todayBrand, index) => {
        if (index === -1) return "숨김";
        return (
          <TableDelButton
            title={todayBrand.isHidden ? "숨김해제" : "숨김"}
            className={`px-[12px] py-[6px] text-[12px]`}
            onClick={() => onToggleHidden(todayBrand.id, !todayBrand.isHidden)}
          />
        );
      },
    },
    {
      key: "detail",
      title: "상세보기",
      width: "100px",
      align: "center",
      render: (_, todayBrand, index) => {
        if (index === -1) return "상세보기";

        return (
          <div className="flex items-center justify-center">
            <IconButton
              icon="plus_white"
              className={BUTTON_DETAIL_VARIANT.default}
              onClick={() =>
                onNavigate(todayBrand.id, todayBrand.newsletterType)
              }
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

const TodayBrandTable = ({
  todayBrandList,
  onNavigate,
  onToggleHidden,
  newsletterType,
}: TodayBrandTableProps) => {
  const columns = useMemo(
    () => TODAY_BRAND_TABLE_COLUMNS(onNavigate, onToggleHidden, newsletterType),
    [onNavigate, onToggleHidden, newsletterType]
  );

  if (!todayBrandList || todayBrandList.length === 0) {
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
      data={todayBrandList}
      className="border-system-200 bg-white"
    />
  );
};

export default TodayBrandTable;
