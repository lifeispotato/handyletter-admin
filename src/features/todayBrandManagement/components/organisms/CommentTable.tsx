import Table from "@/shared/components/organisms/table/Table";
import TableDelButton from "@/shared/components/atoms/button/TableDelButton";
import type { TableColumn } from "@/shared/types/tableTypes";
import { useMemo } from "react";
import Pagination from "@/shared/components/organisms/pagination/Pagination";
import { route } from "@/routes/route";

interface CommentData {
  id: number;
  email: string;
  commentDate: string;
  content: string;
  isHidden: boolean;
}

interface CommentTableProps {
  comments: CommentData[];
  onToggleHidden: (id: number, isHidden: boolean) => void;
  currentPage?: number;
  totalPages?: number;
}

const COMMENT_TABLE_COLUMNS = (
  onToggleHidden: (id: number, isHidden: boolean) => void
): TableColumn<CommentData>[] => {
  return [
    {
      key: "id",
      title: "No",
      width: "80px",
      align: "center",
      render: (_, comment, index) => {
        if (index === -1) return "No";
        return <span>{String(comment.id).padStart(2, "0")}</span>;
      },
    },
    {
      key: "email",
      title: "이메일",
      width: "200px",
      render: (_, comment, index) => {
        if (index === -1) return "이메일";
        return <span>{comment.email}</span>;
      },
    },
    {
      key: "commentDate",
      title: "댓글 일자",
      width: "150px",
      align: "center",
      render: (_, comment, index) => {
        if (index === -1) return "댓글 일자";
        const date = new Date(comment.commentDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return <span>{year}/{month}/{day}</span>;
      },
    },
    {
      key: "content",
      title: "내용",
      width: "auto",
      render: (_, comment, index) => {
        if (index === -1) return "내용";
        return (
          <div className="truncate max-w-[400px]" title={comment.content}>
            {comment.content}
          </div>
        );
      },
    },
    {
      key: "isHidden",
      title: "숨김",
      width: "120px",
      align: "center",
      render: (_, comment, index) => {
        if (index === -1) return "숨김";
        return (
          <TableDelButton
            title={comment.isHidden ? "숨김처리" : "숨김"}
            className={`px-[12px] py-[6px] text-[12px]`}
            onClick={() => onToggleHidden(comment.id, !comment.isHidden)}
          />
        );
      },
    },
  ];
};

const CommentTable = ({
  comments,
  onToggleHidden,
  currentPage = 1,
  totalPages = 1,
}: CommentTableProps) => {
  const columns = useMemo(
    () => COMMENT_TABLE_COLUMNS(onToggleHidden),
    [onToggleHidden]
  );

  if (!comments || comments.length === 0) {
    return (
      <div className="border-system-200 bg-white p-4">
        <div className="flex h-32 items-center justify-center text-gray-500">
          댓글이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Table
        columns={columns}
        data={comments}
        className="border-system-200 bg-white"
      />
      {totalPages > 1 && (
        <div className="mt-[40px] mb-[20px] flex justify-center">
          <Pagination
            route={route.todayBrandDetail}
            totalPages={totalPages}
            currentPage={currentPage}
            rangeSize={5}
          />
        </div>
      )}
    </div>
  );
};

export default CommentTable;

