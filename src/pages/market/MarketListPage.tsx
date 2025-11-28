import cardBg1 from "@/shared/assets/images/bg_card.jpg";
import { MarketSLiderSection } from "@/widgets/SliderSection/MarketSLiderSection";
import { MarketBanner } from "../../features/market/components/MarketBanner";
import { MarketSection } from "@/widgets/MarketSection/MarketSection";

export interface MarketCardData {
  id: string | number;
  title: string;
  imageUrl: string;
  discount: number;
  price: number;
  type: string;
  location: string;
}

const marketCards: MarketCardData[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: "제주도 현지 오징어 특가 판매!",
  type: "호텔",
  location: "제주도",
  price: 100000,
  discount: 10,
  imageUrl: i % 2 === 0 ? cardBg1 : cardBg1,
}));

const MarketListPage = () => {
  return (
    <div className="w-full bg-white pb-[100px]">
      {/* 1. Hero Banner */}
      <MarketBanner />

      {/* 2. Market SLider Section */}
      <MarketSLiderSection cards={marketCards} />

      {/* 3. Curated Section 1 */}
      <MarketSection
        title="☘️ 숙소 여기보다는 좋을 수 없을걸요?"
        subtitle="전국 곳곳에 있는 숙소들 중 각 지역의 분위기를 고스란히 느낄 수 있는 곳들만 갖고 왔어요!"
        // highlightText="" // No highlight in this title
        cards={marketCards}
        buttonText="전체 보러가기"
        buttonVariant="pill"
        highlightText={""}
      />
    </div>
  );
};

export default MarketListPage;
