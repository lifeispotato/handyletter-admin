import DetailInfoWrapper from "@/shared/components/atoms/layout/detailPage/DetailInfoWrapper";
import DetailInfoText from "@/shared/components/atoms/text/DetailInfoText";
import DetailInfoTitle from "@/shared/components/atoms/text/DetailInfoTitle";
import DetailPageTitle from "@/shared/components/atoms/text/DetailPageTitle";
import ImgFilePreview from "@/shared/components/organisms/file/ImgFilePreview";
import type { TodayBrandData } from "@/api/newsletter/todayBrand.types";

interface BasicInfoViewProps {
  data: TodayBrandData & {
    subtitle?: string;
    region?: string;
    thumbnail1?: string;
    thumbnail2?: string;
  };
}

export const BasicInfoView = ({ data }: BasicInfoViewProps) => {
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
          <DetailInfoTitle>콘텐츠 제목</DetailInfoTitle>
          <DetailInfoText>{data.title}</DetailInfoText>
        </DetailInfoWrapper>

        {data.subtitle && (
          <DetailInfoWrapper>
            <DetailInfoTitle>콘텐츠 소제목</DetailInfoTitle>
            <DetailInfoText>{data.subtitle}</DetailInfoText>
          </DetailInfoWrapper>
        )}

        <DetailInfoWrapper>
          <DetailInfoTitle>에디터명</DetailInfoTitle>
          <DetailInfoText>{data.editorName}</DetailInfoText>
        </DetailInfoWrapper>

        {data.region && (
          <DetailInfoWrapper>
            <DetailInfoTitle>지역</DetailInfoTitle>
            <DetailInfoText>{data.region}</DetailInfoText>
          </DetailInfoWrapper>
        )}

        <DetailInfoWrapper>
          <DetailInfoTitle>발행일</DetailInfoTitle>
          <DetailInfoText>{formatDate(data.publishedAt)}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>좋아요 수</DetailInfoTitle>
          <DetailInfoText>{String(data.likeCount).padStart(3, "0")}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>댓글 수</DetailInfoTitle>
          <DetailInfoText>{String(data.commentCount).padStart(3, "0")}</DetailInfoText>
        </DetailInfoWrapper>

        <DetailInfoWrapper>
          <DetailInfoTitle>숨김 여부</DetailInfoTitle>
          <DetailInfoText>{data.isHidden ? "숨김" : "공개"}</DetailInfoText>
        </DetailInfoWrapper>

        {(data.thumbnail1 || data.thumbnail2) && (
          <>
            {data.thumbnail1 && (
              <DetailInfoWrapper>
                <DetailInfoTitle>썸네일 1</DetailInfoTitle>
                <ImgFilePreview
                  imageOriginName={data.thumbnail1}
                  imageStoredName={data.thumbnail1}
                />
              </DetailInfoWrapper>
            )}

            {data.thumbnail2 && (
              <DetailInfoWrapper>
                <DetailInfoTitle>썸네일 2</DetailInfoTitle>
                <ImgFilePreview
                  imageOriginName={data.thumbnail2}
                  imageStoredName={data.thumbnail2}
                />
              </DetailInfoWrapper>
            )}
          </>
        )}

        <DetailInfoWrapper className="items-start">
          <DetailInfoTitle className="mt-[1px]">상세내용</DetailInfoTitle>
          <DetailInfoText className="whitespace-pre-wrap">{data.content}</DetailInfoText>
        </DetailInfoWrapper>
      </div>
    </div>
  );
};

