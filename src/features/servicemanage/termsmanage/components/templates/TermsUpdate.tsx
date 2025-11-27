import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_SAVE_VARIANT } from "@/shared/styles/button";
import BasicText from "@/shared/components/atoms/text/BasicText";
import { LabelValue } from "@/shared/components/atoms/text/LabelValue";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import { useState } from "react";
import useTermsUpdate from "../../hooks/useTermsUpdate";
import ConfirmDialogModal from "@/shared/components/atoms/modal/ConfirmDialogModal";

const TermsUpdate = () => {
  const { formData, updateForm, handleUpdate, goBack } = useTermsUpdate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <div className="min-h-[600px] w-[1044px]">
      <div className="mb-[20px] flex w-full items-center justify-between">
        <div className="flex h-[42px] items-center gap-[6px]">
          <IconButton
            icon="arrow_left"
            className="group font-pretendard text-system-500 hover:text-system-700 flex cursor-pointer items-center justify-center gap-[8px] text-[16px] font-bold transition-colors duration-200"
            iconClassName="w-[28px] h-[28px] flex flex-row items-center justify-center px-[6px] py-[6px] rounded-[8px] border border-system-200 text-system-500 bg-white group-hover:bg-system-100 group-hover:text-system-700 transition-colors duration-200"
            onClick={goBack}
          >
            뒤로가기
          </IconButton>
        </div>
      </div>
      <div className="rounded-[10px] border border-[#DFE1E4] bg-white p-[40px]">
        <div>
          <BasicText
            children="수정하기"
            className="text-[18px] leading-[25px] font-bold tracking-[-0.3px] text-[#262C31]"
          />
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <LabelValue
            label="약관명"
            value={formData.title}
            labelClassName="w-[200px]"
            variant="input"
            onChange={(value) => updateForm("title", value)}
          />
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <LabelValue
            label="약관내용"
            value={formData.content}
            labelClassName="w-[200px]"
            variant="textarea"
            rows={3}
            onChange={(value) => updateForm("content", value)}
          />
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <LabelValue
            label="필수 선택 여부"
            value={formData.termsType}
            labelClassName="w-[200px]"
            variant="radio"
            options={[
              { value: "BASIC", label: "필수" },
              { value: "ADDITIONAL", label: "선택" },
            ]}
            onChange={(value) =>
              updateForm("termsType", value as "BASIC" | "ADDITIONAL")
            }
          />
        </div>
        <div className="mt-[30px] flex justify-end">
          <BasicButton
            children="저장하기"
            className={BUTTON_SAVE_VARIANT.default}
            onClick={() => setIsUpdateModalOpen(true)}
          />
        </div>
      </div>
      <ConfirmDialogModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdate}
        title="해당 약관을 수정하시겠습니까?"
        description="수정된 데이터는 즉시 반영됩니다."
        variant="update"
      />
    </div>
  );
};

export default TermsUpdate;
