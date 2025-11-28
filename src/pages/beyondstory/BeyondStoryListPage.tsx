import { BeyondStoryBanner } from "@/features/beyondStory/components/BeyondStoryBanner";
import videoCard1 from "@/shared/assets/images/video_card.png";
import videoCard2 from "@/shared/assets/images/video_card02.png";
import videoCard3 from "@/shared/assets/images/video_card03.png";
import videoCard4 from "@/shared/assets/images/video_card04.png";
import cardBg7 from "@/shared/assets/images/bg_card07.png";
import cardBg8 from "@/shared/assets/images/bg_card08.png";
import cardBg9 from "@/shared/assets/images/bg_card09.png";
import cardBg10 from "@/shared/assets/images/bg_card10.png";
import cardBg11 from "@/shared/assets/images/bg_card11.png";
import cardBg12 from "@/shared/assets/images/bg_card12.png";
import {
  HomeSection,
  type CardData,
} from "@/widgets/HomeSection/HomeSection.tsx";
import {
  VideoCarouselSection,
  type VideoCardData,
} from "@/widgets/VideoCarouselSection/VideoCarouselSection.tsx";

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

const beyondStoryCards: CardData[] = [
  {
    id: 7,
    title: "무화과 대표님께서 1년만에 매출이 8배 늘어난 이유",
    author: "From. 핸디레터",
    imageUrl: cardBg7,
  },
  {
    id: 8,
    title: "간판도 없는 동네 빵집에 매일 줄을 서는 이유",
    author: "From. 핸디레터",
    imageUrl: cardBg8,
  },
  {
    id: 9,
    title: "커피 덕후의 개인 카페 창업기",
    author: "From. 핸디레터",
    imageUrl: cardBg9,
  },
  {
    id: 10,
    title: "소금빵 하나만 팠어요",
    author: "From. 핸디레터",
    imageUrl: cardBg10,
  },
  {
    id: 11,
    title: "미용업계 1위가 되기까지",
    author: "From. 핸디레터",
    imageUrl: cardBg11,
  },
  {
    id: 12,
    title: "국밥이 너무 좋아서 아예 가게를 만들었죠",
    author: "From. 핸디레터",
    imageUrl: cardBg12,
  },
];

const BeyondStoryListPage = () => {
  return (
    <div className="w-full bg-white pb-[100px]">
      {/* 1. Hero Banner */}
      <BeyondStoryBanner />

      <div className="h-[80px]"></div>

      {/* 2. Video Section */}
      <VideoCarouselSection
        title="📢 핸디 에디터들이 직접 인터뷰한 사장님들의 사업 스토리 영상으로 미리 보기"
        highlightText=""
        cards={videoCards}
      />

      <div className="h-[40px]"></div>

      {/* 3. Curated Section 1 */}
      <HomeSection
        title="🤫 어디에서도 말씀하신 적 없는 사장님들의 진짜 이야기"
        subtitle="사장님들께서 사업을 성공시키기까지의 과정을 핸디레터가 직접 담아봤습니다."
        // highlightText="" // No highlight in this title
        cards={beyondStoryCards}
        buttonText="전체 보러가기"
        buttonVariant="pill"
        highlightText={""}
      />
    </div>
  );
};

export default BeyondStoryListPage;
