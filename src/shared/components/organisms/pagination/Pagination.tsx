import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PretendardText from "../../atoms/text/PretendardText";
import { cn } from "./../../../utils/style";

interface PaginationProps {
  route: string;
  totalPages: number;
  currentPage: number;
  rangeSize: number;
  className?: string;
}

// 용도: 페이지네이션
// #tag: #페이지네이션 #페이징처리 #pagination

const Pagination: React.FC<PaginationProps> = ({
  route,
  totalPages,
  currentPage,
  rangeSize,
  className,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // 현재 페이지 그룹의 시작과 끝 번호 계산
  const pageList = useMemo(() => {
    const pageGroup = Math.ceil(currentPage / rangeSize);

    let firstNumber = pageGroup * rangeSize - (rangeSize - 1);
    if (firstNumber <= 0) firstNumber = 1;

    let lastNumber = pageGroup * rangeSize;
    if (lastNumber > totalPages) lastNumber = totalPages;

    return Array.from(
      { length: lastNumber - firstNumber + 1 },
      (_, i) => firstNumber + i
    );
  }, [totalPages, currentPage, rangeSize]);

  // 페이지 이동 함수
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    // 기존 queryString 유지 + page 값 변경
    searchParams.set("page", page.toString());

    navigate(`${route}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <>
      {pageList.length > 0 && (
        <div
          className={cn(
            `mt-10 w-full max-w-[1044px] flex items-center justify-center gap-2`,
            className
          )}
        >
          {/* 왼쪽 화살표 */}
          <img
            src="/assets/admin/icons/ic_arrow_gray_left.png"
            alt="arrow-left"
            className="cursor-pointer w-[28px] h-[28px] hover:brightness-98"
            onClick={() => goToPage(currentPage - 1)}
          />

          {/* 페이지 번호 */}
          <div className="flex items-center gap-1 cursor-pointer">
            {pageList.map((item) => (
              <PretendardText
                key={item}
                className={`
                  w-[30px] h-[30px]
                  flex-center
                  font-semibold text-[16px]
                  bg-white hover:bg-gray-200 rounded-[6px] 
                  ${
                    Number(currentPage) === item
                      ? "text-gray-700 !bg-gray-200"
                      : "text-gray-500"
                  }
                `}
                onClick={() => goToPage(item)}
              >
                {item}
              </PretendardText>
            ))}
          </div>

          {/* 오른쪽 화살표 */}
          <img
            src="/assets/admin/icons/ic_arrow_gray_right.png"
            alt="arrow-right"
            className="cursor-pointer w-[28px] h-[28px] hover:brightness-98"
            onClick={() => goToPage(currentPage + 1)}
          />
        </div>
      )}
    </>
  );
};

export default Pagination;
