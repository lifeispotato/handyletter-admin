import BasicInput from "@/shared/components/atoms/inputs/BasicInput";
import DetailInfoWrapper from "@/shared/components/atoms/layout/detailPage/DetailInfoWrapper";
import DetailInfoTitle from "@/shared/components/atoms/text/DetailInfoTitle";
import DetailPageTitle from "@/shared/components/atoms/text/DetailPageTitle";
import ImgFilePreview from "@/shared/components/organisms/file/ImgFilePreview";
import { useEffect, useState } from "react";

interface BasicInfoEditProps {
  initialData: any;
}

export const BasicInfoEdit = ({ initialData }: BasicInfoEditProps) => {
  // --- State for Editable Fields ---
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [nickname, setNickname] = useState(initialData?.nickname || "");

  useEffect(() => {
    setName(initialData?.name || "");
    setEmail(initialData?.email || "");
    setPhone(initialData?.phone || "");
    setNickname(initialData?.nickname || "");
  }, [initialData]);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-12">
      <DetailPageTitle className="mb-4 text-lg font-bold">
        회원 정보 수정
      </DetailPageTitle>
      <div className="flex flex-col gap-4">
        <DetailInfoWrapper>
          <DetailInfoTitle>이메일</DetailInfoTitle>
          <BasicInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>이름</DetailInfoTitle>
          <BasicInput value={name} onChange={(e) => setName(e.target.value)} />
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>휴대폰 번호</DetailInfoTitle>
          <BasicInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DetailInfoWrapper>
      </div>

      <DetailPageTitle className="mb-4 mt-6">프로필 정보</DetailPageTitle>
      <div className="flex flex-col gap-4">
        <DetailInfoWrapper>
          <DetailInfoTitle>프로필 이미지</DetailInfoTitle>
          <ImgFilePreview
            imageOriginName={initialData.profileImage}
            imageStoredName={initialData.profileImage}
          />
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          <DetailInfoTitle>닉네임</DetailInfoTitle>
          <BasicInput
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </DetailInfoWrapper>
      </div>
    </div>
  );
};
