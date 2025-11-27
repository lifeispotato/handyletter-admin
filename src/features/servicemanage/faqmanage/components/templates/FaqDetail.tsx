import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import {
  BUTTON_DELETE_VARIANT,
  BUTTON_UPDATE_VARIANT,
} from "@/shared/styles/button";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import BasicText from "@/shared/components/atoms/text/BasicText";
import { LabelValue } from "@/shared/components/atoms/text/LabelValue";
import { TEXTAREA_STYLES } from "@/shared/styles/textarea";
import ConfirmDialogModal from "@/shared/components/atoms/modal/ConfirmDialogModal";
import { useState } from "react";
import useFaqDetail from "../../hooks/useFaqDetail";
import { formatDate } from "@/shared/utils/dateUtils";

const FaqDetail = () => {
  const { formData, goBack, goToUpdate, handleDelete } = useFaqDetail();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="w-[1044px]">
      <div className="mb-[20px] flex w-full items-center justify-between">
        <div>
          <IconButton
            icon="arrow_left"
            className="group font-pretendard text-system-500 hover:text-system-700 flex cursor-pointer items-center justify-center gap-[8px] text-[16px] font-bold transition-colors duration-200"
            iconClassName="w-[28px] h-[28px] flex flex-row items-center justify-center px-[6px] py-[6px] rounded-[8px] border border-system-200 text-system-500 bg-white group-hover:bg-system-100 group-hover:text-system-700 transition-colors duration-200"
            onClick={goBack}
          >
            뒤로가기
          </IconButton>
        </div>
        <div className="flex items-center gap-[6px]">
          <BasicButton
            children="삭제"
            className={BUTTON_DELETE_VARIANT.delete}
            onClick={() => setIsDeleteModalOpen(true)}
          />
          <BasicButton
            children="수정"
            className={BUTTON_UPDATE_VARIANT.update}
            onClick={goToUpdate}
          />
        </div>
      </div>
      <div className="rounded-[10px] border border-[#DFE1E4] bg-white p-[40px]">
        <div>
          <BasicText
            children="기본정보"
            className="text-[18px] leading-[25px] font-bold tracking-[-0.3px] text-[#262C31]"
          />
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <LabelValue
            label="제목"
            value={formData.title}
            labelClassName="w-[200px]"
            variant="text"
          />
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="관리자 이메일"
              value={formData.adminEmail}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="게시일"
              value={formatDate(formData.createdAt)}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="내용"
              value={formData.content}
              labelClassName="w-[200px]"
              variant="textarea"
              valueClassName={TEXTAREA_STYLES.variants.labelValue}
            />
          </div>
        </div>
      </div>
      <ConfirmDialogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="해당 FAQ를 삭제하시겠습니까?"
        description="삭제된 데이터는 복구가 불가합니다."
        variant="delete"
      />
    </div>
  );
};

export default FaqDetail;
