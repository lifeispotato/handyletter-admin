import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_SAVE_VARIANT } from "@/shared/styles/button";
import BasicText from "@/shared/components/atoms/text/BasicText";
import { LabelValue } from "@/shared/components/atoms/text/LabelValue";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import ConfirmDialogModal from "@/shared/components/atoms/modal/ConfirmDialogModal";
import { useState } from "react";
import useFaqCreate from "../../hooks/useFaqCreate";

const FaqCreate = () => {
  const { formData, updateForm, handleCreate, isValid, goBack } =
    useFaqCreate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            children="추가하기"
            className="text-[18px] leading-[25px] font-bold tracking-[-0.3px] text-[#262C31]"
          />
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <LabelValue
            label="제목"
            value={formData.title}
            placeholder="제목을 입력해주세요"
            labelClassName="w-[200px]"
            variant="input"
            required={true}
            onChange={(value) => updateForm("title", value)}
          />
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <LabelValue
            label="내용"
            value={formData.content}
            placeholder="내용을 입력해주세요"
            labelClassName="w-[200px]"
            variant="textarea"
            required={true}
            rows={3}
            onChange={(value) => updateForm("content", value)}
          />
        </div>
        <div className="mt-[30px] flex justify-end">
          <BasicButton
            children="저장하기"
            className={BUTTON_SAVE_VARIANT.default}
            onClick={() => setIsCreateModalOpen(true)}
            isDisabled={!isValid}
          />
        </div>
      </div>
      <ConfirmDialogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreate}
        title="해당 FAQ를 추가하시겠습니까?"
        variant="update"
      />
    </div>
  );
};

export default FaqCreate;
