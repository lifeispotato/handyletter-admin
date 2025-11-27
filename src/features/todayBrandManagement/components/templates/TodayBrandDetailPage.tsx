import { BasicInfoView } from "@/features/todayBrandManagement/components/organisms/tabs/BasicInfoView";
import { ShortFormInfoView } from "@/features/todayBrandManagement/components/organisms/tabs/ShortFormInfoView";
import { StoryInfoView } from "@/features/todayBrandManagement/components/organisms/tabs/StoryInfoView";
import CommentTable from "@/features/todayBrandManagement/components/organisms/CommentTable";
import { route } from "@/routes/route";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import {
  BUTTON_DELETE_VARIANT,
  BUTTON_EXCEL_VARIANT,
} from "@/shared/styles/button";
import DetailPageTitle from "@/shared/components/atoms/text/DetailPageTitle";
import { useNavigate, useParams } from "react-router-dom";
import useTodayBrandDetail from "../../hooks/useTodayBrandDetail";

const TodayBrandDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { todayBrandData, handleDelete, handleToggleHidden } = useTodayBrandDetail();

  // Mock comment data
  const mockComments = [
    {
      id: 1,
      email: "이메일@이메일.com",
      commentDate: new Date().toISOString(),
      content: "정말 좋은 뉴스레터 내용입니다.",
      isHidden: false,
    },
    {
      id: 2,
      email: "이메일2@이메일.com",
      commentDate: new Date().toISOString(),
      content: "정말 좋은 뉴스레터 내용입니다.",
      isHidden: true,
    },
  ];

  const goToUpdate = () => {
    navigate(`${route.todayBrandUpdate}/${id}`);
  };

  if (!todayBrandData) {
    return (
      <div className="w-full max-w-[1044px]">
        <div className="flex h-64 items-center justify-center text-gray-500">
          데이터를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1044px]">
      {/* --- Header --- */}
      <div className="mb-4 flex justify-between">
        <IconButton
          icon="arrow_left"
          className="group font-pretendard text-system-500 hover:text-system-700 flex cursor-pointer items-center justify-center gap-[8px] text-[16px] font-bold transition-colors duration-200"
          iconClassName="w-[28px] h-[28px] flex flex-row items-center justify-center px-[6px] py-[6px] rounded-[8px] border border-system-200 text-system-500 bg-white group-hover:bg-system-100 group-hover:text-system-700 transition-colors duration-200"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </IconButton>
        <div className="flex justify-end gap-2">
          <BasicButton
            className={`${BUTTON_DELETE_VARIANT.selected_delete} w-auto px-5`}
            onClick={handleDelete}
          >
            삭제
          </BasicButton>
          <BasicButton
            className={`${BUTTON_EXCEL_VARIANT.default} w-auto px-5`}
            onClick={handleToggleHidden}
          >
            {todayBrandData.isHidden ? "숨김해제" : "숨김"}
          </BasicButton>
          <BasicButton
            className={`${BUTTON_EXCEL_VARIANT.default} w-auto px-5`}
            onClick={goToUpdate}
          >
            수정하기
          </BasicButton>
        </div>
      </div>

      {/* --- Basic Info Section --- */}
      <div className="mt-6 rounded-lg bg-white">
        {todayBrandData.newsletterType === "TODAY_BRAND" && (
          <BasicInfoView data={todayBrandData} />
        )}
        {todayBrandData.newsletterType === "SHORT_FORM" && (
          <ShortFormInfoView data={todayBrandData} />
        )}
        {todayBrandData.newsletterType === "STORY" && (
          <StoryInfoView data={todayBrandData} />
        )}
      </div>

      {/* --- Comment Section --- */}
      {todayBrandData.newsletterType === "TODAY_BRAND" && (
        <div className="mt-6 rounded-lg bg-white p-12">
          <DetailPageTitle className="mb-4">
            댓글 {String(mockComments.length).padStart(2, "0")}
          </DetailPageTitle>
          <CommentTable
            comments={mockComments}
            onToggleHidden={(commentId, isHidden) => {
              console.log("Toggle comment hidden:", commentId, isHidden);
            }}
            currentPage={1}
            totalPages={1}
          />
        </div>
      )}
    </div>
  );
};

export default TodayBrandDetailPage;

