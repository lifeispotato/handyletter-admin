import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_SAVE_VARIANT } from "@/shared/styles/button";
import BasicText from "@/shared/components/atoms/text/BasicText";
import { LabelValue } from "@/shared/components/atoms/text/LabelValue";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import ConfirmDialogModal from "@/shared/components/atoms/modal/ConfirmDialogModal";
import { useState } from "react";
import useBasicUpdate from "../../hooks/useBasicUpdate";

const BasicUpdate = () => {
  const { formData, updateForm, handleUpdate, isValid, goBack } =
    useBasicUpdate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <div className="mb-[196px] w-[1044px]">
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
            label="상호명"
            value={formData.companyName}
            labelClassName="w-[200px]"
            variant="input"
            required={true}
            onChange={(value) => updateForm("companyName", value)}
          />
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="대표자"
              value={formData.ceo}
              labelClassName="w-[200px]"
              variant="input"
              required={true}
              onChange={(value) => updateForm("ceo", value)}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="사업자등록번호"
              value={formData.businessNumber}
              labelClassName="w-[200px]"
              variant="input"
              required={true}
              onChange={(value) => updateForm("businessNumber", value)}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="통신판매업신고번호"
              value={formData.mailOrderSaleNumber}
              labelClassName="w-[200px]"
              variant="input"
              required={true}
              onChange={(value) => updateForm("mailOrderSaleNumber", value)}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="주소"
              value={formData.address}
              labelClassName="w-[200px]"
              variant="input"
              required={true}
              onChange={(value) => updateForm("address", value)}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="전화번호"
              value={formData.tel}
              labelClassName="w-[200px]"
              variant="input"
              required={true}
              onChange={(value) => updateForm("tel", value)}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="이메일"
              value={formData.email}
              labelClassName="w-[200px]"
              variant="input"
              required={true}
              onChange={(value) => updateForm("email", value)}
            />
          </div>
        </div>
        <div className="mt-[30px] flex justify-end">
          <BasicButton
            children="수정하기"
            className={BUTTON_SAVE_VARIANT.default}
            onClick={() => setIsUpdateModalOpen(true)}
            isDisabled={!isValid}
          />
        </div>
      </div>
      <ConfirmDialogModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdate}
        title="변경사항을 저장하시겠습니까?"
        description="변경된 데이터는 즉시 반영됩니다."
        variant="update"
      />
    </div>
  );
};

export default BasicUpdate;
