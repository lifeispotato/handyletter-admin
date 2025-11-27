import CheckBox from "@/shared/components/atoms/inputs/CheckBox-Old";
import DetailInfoWrapper from "@/shared/components/atoms/layout/detailPage/DetailInfoWrapper";
import DetailInfoText from "@/shared/components/atoms/text/DetailInfoText";
import DetailInfoTitle from "@/shared/components/atoms/text/DetailInfoTitle";
import DetailPageTitle from "@/shared/components/atoms/text/DetailPageTitle";
import ImgFilePreview from "@/shared/components/organisms/file/ImgFilePreview";

interface BasicInfoViewProps {
  userType: "student" | "tutor";
  data: any;
}

// --- Helper function to render Checkboxes with reversed layout ---
const ReversedCheckBox = (props: React.ComponentProps<typeof CheckBox>) => (
  <CheckBox
    {...props}
    className="flex w-full flex-row-reverse justify-end"
    labelClassName="ml-0 mr-2 text-system-500"
  />
);

export const BasicInfoView = ({ data }: BasicInfoViewProps) => {
  // Common content for agreements (always disabled in view mode)
  const termsContent = (
    <div className="flex flex-col gap-2 pt-1">
      <ReversedCheckBox
        label="회원 이용약관 (필수)"
        checked={data.termsAgreement1}
        onChange={() => {}}
        isDisabled
      />
      <ReversedCheckBox
        label="개인정보 수집 및 이용 동의 (필수)"
        checked={data.termsAgreement2}
        onChange={() => {}}
        isDisabled
      />
      <ReversedCheckBox
        label="개인정보 제 3자 제공 동의 (필수)"
        checked={data.termsAgreement3}
        onChange={() => {}}
        isDisabled
      />
    </div>
  );

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-12">
      <DetailPageTitle className="mb-4">기본 정보</DetailPageTitle>
      <div className="flex flex-col gap-4">
        <DetailInfoWrapper>
          <DetailInfoTitle>계정 상태</DetailInfoTitle>
          <DetailInfoText>{data.userId}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>가입일</DetailInfoTitle>
          <DetailInfoText>{data.name}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>가입 유형</DetailInfoTitle>
          <DetailInfoText>{data.email}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>이메일</DetailInfoTitle>
          <DetailInfoText>{data.phone}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>이름</DetailInfoTitle>
          <DetailInfoText>{data.status}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>휴대폰 번호</DetailInfoTitle>
          <DetailInfoText>{data.status}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper className="items-start">
          <DetailInfoTitle className="mt-[1px]">약관 동의</DetailInfoTitle>
          {termsContent}
        </DetailInfoWrapper>
      </div>

      <DetailPageTitle className="mb-4 mt-6">프로필 정보</DetailPageTitle>
      <div className="flex flex-col gap-4">
        <DetailInfoWrapper>
          <DetailInfoTitle>프로필 이미지</DetailInfoTitle>
          <ImgFilePreview
            imageOriginName={data.profileImage}
            imageStoredName={data.profileImage}
          />
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          <DetailInfoTitle>아이디</DetailInfoTitle>
          <DetailInfoText>{data.userId}</DetailInfoText>
        </DetailInfoWrapper>
      </div>
    </div>
  );
};
