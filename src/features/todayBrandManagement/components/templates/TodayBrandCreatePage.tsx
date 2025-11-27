import { BasicInfoEdit } from "@/features/todayBrandManagement/components/organisms/tabs/BasicInfoEdit";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_EXCEL_VARIANT } from "@/shared/styles/button";
import { useNavigate } from "react-router-dom";
import { route } from "@/routes/route";
import { useState } from "react";
import { toast } from "react-toastify";

const TodayBrandCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    editorName: string;
    region: string;
    thumbnail1: any;
    thumbnail2: any;
    isHidden: boolean;
    content: string;
  } | null>(null);

  const goBack = () => {
    navigate(route.todayBrandList);
  };

  const handleSave = async () => {
    if (!formData) {
      toast.error("데이터를 입력해주세요");
      return;
    }

    if (!formData.title || !formData.content) {
      toast.error("콘텐츠 제목과 상세 내용은 필수입니다");
      return;
    }

    try {
      // TODO: 실제 API 호출
      console.log("Saving data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("저장되었습니다");
      navigate(route.todayBrandList);
    } catch {
      toast.error("저장에 실패했습니다");
    }
  };

  return (
    <div className="w-full max-w-[1044px]">
      {/* --- Header --- */}
      <div className="mb-4 flex justify-between">
        <IconButton
          icon="arrow_left"
          className="group font-pretendard text-system-500 hover:text-system-700 flex cursor-pointer items-center justify-center gap-[8px] text-[16px] font-bold transition-colors duration-200"
          iconClassName="w-[28px] h-[28px] flex flex-row items-center justify-center px-[6px] py-[6px] rounded-[8px] border border-system-200 text-system-500 bg-white group-hover:bg-system-100 group-hover:text-system-700 transition-colors duration-200"
          onClick={goBack}
        >
          뒤로가기
        </IconButton>
        <div className="flex justify-end gap-2">
          <BasicButton
            className={`${BUTTON_EXCEL_VARIANT.default} w-auto px-5`}
            onClick={handleSave}
          >
            저장하기
          </BasicButton>
        </div>
      </div>

      {/* --- Form Content Area --- */}
      <div className="mt-6 rounded-lg bg-white">
        <BasicInfoEdit onChange={setFormData} />
      </div>
    </div>
  );
};

export default TodayBrandCreatePage;
