import IconButton from "@/shared/components/molecules/button/IconButton-Old";
import { BUTTON_UPDATE_VARIANT } from "@/shared/styles/button";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import BasicText from "@/shared/components/atoms/text/BasicText";
import { LabelValue } from "@/shared/components/atoms/text/LabelValue";
import useBasicDetail from "../../hooks/useBasicDetail";

const BasicDetail = () => {
  const { basicDetail, goBack, goToUpdate } = useBasicDetail();

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
            children="수정"
            className={BUTTON_UPDATE_VARIANT.update}
            onClick={goToUpdate}
          />
        </div>
      </div>
      <div className="rounded-[10px] border border-[#DFE1E4] bg-white p-[40px]">
        <div>
          <BasicText
            children="기본정보(사업자 정보)"
            className="text-[18px] leading-[25px] font-bold tracking-[-0.3px] text-[#262C31]"
          />
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <LabelValue
            label="상호명"
            value={basicDetail?.companyName}
            labelClassName="w-[200px]"
            variant="text"
          />
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="대표자"
              value={basicDetail?.ceo}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="사업자등록번호"
              value={basicDetail?.businessNumber}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="통신판매업신고번호"
              value={basicDetail?.mailOrderSaleNumber}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="주소"
              value={basicDetail?.address}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="전화번호"
              value={basicDetail?.tel}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <LabelValue
              label="이메일"
              value={basicDetail?.email}
              labelClassName="w-[200px]"
              variant="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetail;
