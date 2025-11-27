import BasicInput from "@/shared/components/atoms/inputs/BasicInput";
import DetailInfoWrapper from "@/shared/components/atoms/layout/detailPage/DetailInfoWrapper";
import DetailInfoTitle from "@/shared/components/atoms/text/DetailInfoTitle";
import DetailPageTitle from "@/shared/components/atoms/text/DetailPageTitle";
import TextFormEditor from "@/shared/components/organisms/input/TextFormEditor";
import DropdownVerGeneric from "@/shared/components/organisms/input/DropdownVerGeneric";
import ImgInput from "@/shared/components/organisms/input/ImgInput";
import ImgPreview from "@/shared/components/organisms/input/ImgPreview";
import { ImageType } from "@/shared/types/data.types";
import { useEffect, useState } from "react";

interface BasicInfoEditProps {
  initialData?: {
    title?: string;
    subtitle?: string;
    editorName?: string;
    region?: string;
    thumbnail1?: ImageType | null;
    thumbnail2?: ImageType | null;
    isHidden?: boolean;
    content?: string;
  };
  onChange?: (data: {
    title: string;
    subtitle: string;
    editorName: string;
    region: string;
    thumbnail1: ImageType | null;
    thumbnail2: ImageType | null;
    isHidden: boolean;
    content: string;
  }) => void;
}

const REGION_LIST = [
  { label: "서울", value: "서울" },
  { label: "부산", value: "부산" },
  { label: "대구", value: "대구" },
  { label: "인천", value: "인천" },
  { label: "광주", value: "광주" },
  { label: "대전", value: "대전" },
  { label: "울산", value: "울산" },
  { label: "세종", value: "세종" },
  { label: "경기", value: "경기" },
  { label: "강원", value: "강원" },
  { label: "충북", value: "충북" },
  { label: "충남", value: "충남" },
  { label: "전북", value: "전북" },
  { label: "전남", value: "전남" },
  { label: "경북", value: "경북" },
  { label: "경남", value: "경남" },
  { label: "제주", value: "제주" },
];

const HIDDEN_STATUS_LIST = [
  { label: "공개", value: false },
  { label: "숨김", value: true },
];

export const BasicInfoEdit = ({
  initialData,
  onChange,
}: BasicInfoEditProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [editorName, setEditorName] = useState(initialData?.editorName || "");
  const [region, setRegion] = useState<{ label: string; value: string } | null>(
    initialData?.region
      ? REGION_LIST.find((r) => r.value === initialData.region) || null
      : null
  );
  const [thumbnail1, setThumbnail1] = useState<ImageType | null>(
    initialData?.thumbnail1 || null
  );
  const [thumbnail2, setThumbnail2] = useState<ImageType | null>(
    initialData?.thumbnail2 || null
  );
  const [isHidden, setIsHidden] = useState<{
    label: string;
    value: boolean;
  } | null>(
    initialData?.isHidden !== undefined
      ? HIDDEN_STATUS_LIST.find((s) => s.value === initialData.isHidden) || null
      : HIDDEN_STATUS_LIST[0]
  );
  const [content, setContent] = useState(initialData?.content || "");

  useEffect(() => {
    setTitle(initialData?.title || "");
    setSubtitle(initialData?.subtitle || "");
    setEditorName(initialData?.editorName || "");
    setRegion(
      initialData?.region
        ? REGION_LIST.find((r) => r.value === initialData.region) || null
        : null
    );
    setThumbnail1(initialData?.thumbnail1 || null);
    setThumbnail2(initialData?.thumbnail2 || null);
    setIsHidden(
      initialData?.isHidden !== undefined
        ? HIDDEN_STATUS_LIST.find((s) => s.value === initialData.isHidden) ||
            null
        : HIDDEN_STATUS_LIST[0]
    );
    setContent(initialData?.content || "");
  }, [initialData]);

  useEffect(() => {
    if (onChange) {
      onChange({
        title,
        subtitle,
        editorName,
        region: region?.value || "",
        thumbnail1,
        thumbnail2,
        isHidden: isHidden?.value || false,
        content,
      });
    }
  }, [
    title,
    subtitle,
    editorName,
    region,
    thumbnail1,
    thumbnail2,
    isHidden,
    content,
    onChange,
  ]);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-12">
      <DetailPageTitle className="mb-4 text-lg font-bold">
        수정 및 추가
      </DetailPageTitle>
      <div className="flex flex-col gap-4">
        <DetailInfoWrapper>
          <DetailInfoTitle>콘텐츠 제목</DetailInfoTitle>
          <BasicInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>콘텐츠 소제목</DetailInfoTitle>
          <BasicInput
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="콘텐츠 소제목"
          />
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>에디터명</DetailInfoTitle>
          <BasicInput
            value={editorName}
            onChange={(e) => setEditorName(e.target.value)}
            placeholder="핸디에디터"
          />
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>지역</DetailInfoTitle>
          <DropdownVerGeneric
            placeholder="지역명"
            selectedItem={region}
            list={REGION_LIST}
            onChange={(item) => setRegion(item)}
            labelKey="label"
          />
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>썸네일1</DetailInfoTitle>
          <div className="flex items-center gap-[10px]">
            <div className="relative">
              <ImgInput
                id="thumbnail1"
                accept="image/*"
                originValue={thumbnail1}
                setValue={setThumbnail1}
                originName="imageOriginName"
                storedName="imageStoredName"
                fileType="newsletter"
              />
            </div>
            {thumbnail1?.temporaryUrl && (
              <ImgPreview
                fileUrl={thumbnail1.temporaryUrl}
                xBtnHandler={() => setThumbnail1(null)}
              />
            )}
          </div>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>썸네일2</DetailInfoTitle>
          <div className="flex items-center gap-[10px]">
            <div className="relative">
              <ImgInput
                id="thumbnail2"
                accept="image/*"
                originValue={thumbnail2}
                setValue={setThumbnail2}
                originName="imageOriginName"
                storedName="imageStoredName"
                fileType="newsletter"
              />
            </div>
            {thumbnail2?.temporaryUrl && (
              <ImgPreview
                fileUrl={thumbnail2.temporaryUrl}
                xBtnHandler={() => setThumbnail2(null)}
              />
            )}
          </div>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>숨김 여부</DetailInfoTitle>
          <DropdownVerGeneric
            placeholder="공개"
            selectedItem={isHidden}
            list={HIDDEN_STATUS_LIST}
            onChange={(item) => setIsHidden(item)}
            labelKey="label"
          />
        </DetailInfoWrapper>

        <DetailInfoWrapper className="items-start">
          <DetailInfoTitle className="mt-[1px]">상세 내용</DetailInfoTitle>
          <div className="w-full max-w-[730px]">
            <TextFormEditor
              content={content}
              setContent={setContent}
              editorHeight="300px"
              maxHeight="600px"
            />
          </div>
        </DetailInfoWrapper>
      </div>
    </div>
  );
};
