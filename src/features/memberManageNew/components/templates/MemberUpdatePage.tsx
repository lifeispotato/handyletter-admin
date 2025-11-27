import { BasicInfoEdit } from "@/features/memberManageNew/components/organisms/tabs/BasicInfoEdit"; // Import the new Edit component
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_EXCEL_VARIANT } from "@/shared/styles/button";
import { useNavigate } from "react-router-dom";

// Mock data (in a real app, you'd fetch this based on `id`)
const mockInitialData = {
  userId: "hong123",
  name: "홍길동",
  email: "hong@example.com",
  phone: "010-1234-5678",
  status: "활성",
  termsAgreement1: true,
  termsAgreement2: true,
  termsAgreement3: true,
  notificationConsent1: false,
  notificationConsent2: true,
  notificationConsent3: false,
};

const MemberUpdatePage = () => {
  const navigate = useNavigate();

  const goBackToDetail = () => {
    navigate(-1); // Go back to detail page
  };

  const handleSave = () => {
    console.log("Saving...");
    // TODO: Get state from BasicInfoEdit (ideally via prop drilling or state manager) and save
    goBackToDetail();
  };

  return (
    <div className="w-full max-w-[1044px]">
      {/* --- Header --- */}
      <div className="mb-4 flex justify-between">
        <IconButton
          icon="arrow_left"
          className="group font-pretendard text-system-500 hover:text-system-700 flex cursor-pointer items-center justify-center gap-[8px] text-[16px] font-bold transition-colors duration-200"
          iconClassName="w-[28px] h-[28px] flex flex-row items-center justify-center px-[6px] py-[6px] rounded-[8px] border border-system-200 text-system-500 bg-white group-hover:bg-system-100 group-hover:text-system-700 transition-colors duration-200"
          onClick={goBackToDetail}
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

      {/* --- Tab Content Area --- */}
      <div className="mt-6 rounded-lg bg-white">
        <BasicInfoEdit initialData={mockInitialData} />
      </div>
    </div>
  );
};

export default MemberUpdatePage;
