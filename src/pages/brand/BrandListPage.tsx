import { BrandBanner } from "../../features/brand/components/BrandBanner/BrandBanner";
import {
  VideoCarouselSection,
  type VideoCardData,
} from "@/widgets/VideoCarouselSection/VideoCarouselSection.tsx";
import {
  HomeSection,
  type CardData,
} from "@/widgets/HomeSection/HomeSection.tsx";
import cardBg1 from "@/shared/assets/images/bg_card.jpg";
import cardBg2 from "@/shared/assets/images/bg_card02.png";
import cardBg3 from "@/shared/assets/images/bg_card03.png";
import cardBg4 from "@/shared/assets/images/bg_card04.png";
import cardBg5 from "@/shared/assets/images/bg_card05.png";
import cardBg6 from "@/shared/assets/images/bg_card06.png";
import videoCard1 from "@/shared/assets/images/video_card.png";
import videoCard2 from "@/shared/assets/images/video_card02.png";
import videoCard3 from "@/shared/assets/images/video_card03.png";
import videoCard4 from "@/shared/assets/images/video_card04.png";

// --- MOCK DATA ---
const videoCards: VideoCardData[] = [
  {
    id: 1,
    title: "",
    viewCount: 714,
    imageUrl: videoCard1,
  },
  {
    id: 2,
    title: "",
    viewCount: 714,
    imageUrl: videoCard2,
  },
  {
    id: 3,
    title: "",
    viewCount: 714,
    imageUrl: videoCard3,
  },
  {
    id: 4,
    title: "",
    viewCount: 714,
    imageUrl: videoCard4,
  },
];

const brandCards: CardData[] = [
  {
    id: 1,
    title: "전주 한옥마을 분위기 체험하기",
    author: "From. 핸디레터 MJ 에디터",
    imageUrl: cardBg1,
    badgeText: "핸디 한정 판매",
  },
  {
    id: 2,
    title: "지금이 제철, 무화과 디저트 맛집",
    author: "From. 핸디레터 MJ 에디터",
    imageUrl: cardBg2,
    isLiked: true,
  },
  {
    id: 3,
    title: "가양 골목길에 위치해 있는 숨겨진 이자카야",
    author: "From. 핸디레터 MJ 에디터",
    imageUrl: cardBg3,
  },
  {
    id: 4,
    title: "서울 강남구 숨겨진 와인바 추천",
    author: "From. 핸디레터 MJ 에디터",
    imageUrl: cardBg4,
    badgeText: "핸디 한정 판매",
  },
  {
    id: 5,
    title: "홍대 근처 프라이빗 카페 체험",
    author: "From. 핸디레터 MJ 에디터",
    imageUrl: cardBg5,
    isLiked: true,
  },
  {
    id: 6,
    title: "이태원 로컬 브런치 맛집 탐방",
    author: "From. 핸디레터 MJ 에디터",
    imageUrl: cardBg6,
  },
];

const BrandListPage = () => {
  return (
    <div className="w-full bg-white pb-[100px]">
      {/* 1. Hero Banner */}
      <BrandBanner />

      <div className="h-[80px]"></div>

      {/* 2. Video Section */}
      <VideoCarouselSection
        title="핸디 에디터들이 찾은"
        highlightText=" 로컬브랜드의 현장! 영상으로 미리 보기"
        cards={videoCards}
      />

      <div className="h-[40px]"></div>

      {/* 3. Curated Section 1 */}
      <HomeSection
        subtitle="친구 혹은 연인과 함께하기 좋은 이색적인 곳들 소개해 볼게요. "
        title="✨ 매번 뻔한 데이트 코스가 지루하다면? 특별한 경험 해보세요 "
        // highlightText="" // No highlight in this title
        cards={brandCards}
        buttonText="전체 보러가기"
        buttonVariant="pill"
        highlightText={""}
      />

      {/* 4. Curated Section 2 */}
      <HomeSection
        subtitle="바쁜 일상 속에서 혼자만의 쉼이 필요할 때 방문해 보세요."
        title="🍃 혼자만의 쉼이 필요할 때 조용한 카페에 머물러 봐요"
        cards={brandCards} // Using same mock data for demo
        buttonText="전체 보러가기"
        buttonVariant="pill"
        highlightText={""}
      />

      {/* 5. Curated Section 3 */}
      <HomeSection
        subtitle="사람들이 잘 모르지만 정말 맛있는 숨겨진 맛집들, 소개해 볼게요."
        title="🍱 맛보장! 핸디 에디터들이 뽑은 숨겨진 맛집 모음"
        cards={brandCards}
        buttonText="전체 보러가기"
        buttonVariant="pill"
        highlightText={""}
      />
    </div>
  );
};

export default BrandListPage;
