import DetailInfoWrapper from "@/shared/components/atoms/layout/detailPage/DetailInfoWrapper";
import DetailInfoText from "@/shared/components/atoms/text/DetailInfoText";
import DetailInfoTitle from "@/shared/components/atoms/text/DetailInfoTitle";
import DetailPageTitle from "@/shared/components/atoms/text/DetailPageTitle";
import FileNamePreview from "@/shared/components/organisms/file/FileNamePreview";
import type { TodayBrandData } from "@/api/newsletter/todayBrand.types";

interface StoryInfoViewProps {
  data: TodayBrandData;
}

export const StoryInfoView = ({ data }: StoryInfoViewProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-12">
      <DetailPageTitle className="mb-4">기본 정보</DetailPageTitle>
      <div className="flex flex-col gap-4">
        <DetailInfoWrapper>
          <DetailInfoTitle>영상 제목</DetailInfoTitle>
          <DetailInfoText>{data.title}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>에디터명</DetailInfoTitle>
          <DetailInfoText>{data.editorName}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>발행일</DetailInfoTitle>
          <DetailInfoText>{formatDate(data.publishedAt)}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>영상 콘텐츠</DetailInfoTitle>
          <div className="flex items-center gap-[12px]">
            <div className="w-[90px] h-[90px] border border-gray-300 rounded-[3px] bg-gray-100" />
            {data.videoContent?.fileName && (
              <FileNamePreview
                fileOriginName={data.videoContent.fileName}
                fileStoredName={data.videoContent.fileStoredName || data.videoContent.fileName}
              />
            )}
          </div>
        </DetailInfoWrapper>
      </div>
    </div>
  );
};

