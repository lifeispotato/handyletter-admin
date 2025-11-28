import cardBg1 from "@/shared/assets/images/bg_card.jpg";
import bgimg from "@/shared/assets/images/home_landing.png";
import { useState } from "react";
import { SliderSection } from "../../widgets/SliderSection/SliderSection";
import chevronLeft from "@/shared/assets/icons/chevron_left_b.svg";
import chevronRight from "@/shared/assets/icons/chevron_right_b.svg";
import shareIcon from "@/shared/assets/icons/share.svg";
import { Button } from "@/shared/components/atoms/Button";

// Mock Data for Carousel
const relatedCards = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: "전주 한옥마을 분위기 체험하기",
  author: "From. 핸디레터 MJ 에디터",
  imageUrl: cardBg1,
  badgeText: i === 0 ? "핸디 한정 판매" : undefined,
  isLiked: true,
}));

// Mock Images for Gallery
const galleryImages = [bgimg, cardBg1, bgimg, cardBg1];

export const MarketDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("스토리");

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const tabs = ["스토리", "후기", "환불 정책"];

  return (
    <div className="w-full bg-white">
      {/* Main Content Section */}
      <div className="w-full max-w-[1280px] mx-auto px-4 py-[60px]">
        <div className="flex gap-[24px]">
          {/* Left: Image Gallery */}
          <div className="flex-1 relative">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={galleryImages[currentImageIndex]}
                alt="Market detail"
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 transition-colors"
              >
                <img src={chevronLeft} alt="Previous" className="w-8 h-8" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 transition-colors"
              >
                <img src={chevronRight} alt="Next" className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Right: Information Panel */}
          <div className="w-[350px] h-fit flex flex-col border border-[#E6E8EB] rounded-[4px] p-[20px]">
            {/* Countdown Timer */}
            <div className="w-fit px-4 py-1 bg-red-50 rounded-full">
              <span className="font-semibold text-[15px] text-red-600">
                종료일까지 2일 08:54:00
              </span>
            </div>

            {/* Category & Location */}
            <div className="flex items-center gap-1 text-[14px] text-[#2b2b2b] mt-5">
              <span>호텔</span>
              <span>|</span>
              <span>제주 서귀포</span>
            </div>

            {/* Title */}
            <h2 className="font-sans font-bold text-[18px] text-gray-7 mt-1">
              도심 골목길에 숨겨져 있는 쉬기 좋은 호텔
            </h2>

            <div className="w-full h-px bg-gray-4 opacity-50 my-5" />

            {/* Description */}
            <p className="text-[14px] text-gray-5 leading-[22px] line-clamp-2">
              무제한 위스키부터 프라이빗 스파까지 무제한 위스키부터 프라이스
              무제한 위스키부터 프라이빗 스파까지 무제한 위스키부터 프라이스
            </p>

            {/* Pricing */}
            <div className="flex gap-1 items-center mt-5">
              <p className="font-sans text-[15px] text-error font-medium">
                10%
              </p>
              <p className="font-sans text-[15px] text-gray-5 font-medium line-through">
                300,000원
              </p>
              <p className="font-sans text-[20px] text-black font-semibold">
                270,000원
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <Button
                variant="primary"
                className="w-full h-[52px] text-[16px] font-bold"
              >
                예약하러 가기
              </Button>
              <Button
                variant="outline"
                className="w-full h-[44px] text-[14px] flex items-center justify-center gap-2 border-0"
                icon={<img src={shareIcon} alt="Share" className="w-4 h-4" />}
                iconPosition="left"
              >
                <span>공유하기</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-[60px] border-b border-gray-200">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-[16px] font-medium transition-colors ${
                  activeTab === tab
                    ? "text-gray-7 border-b-2 border-gray-7"
                    : "text-gray-5 hover:text-gray-7"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Placeholder */}
        <div className="mt-8 min-h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-400 text-[16px]">
            {activeTab} 내용이 여기에 표시됩니다.
          </p>
        </div>
      </div>

      {/* Footer Slider Section */}
      <SliderSection
        tagline="핸디레터 구독하면"
        description={`전체 숨겨진 맛집, 놀거리들과 성공한 사장님들의 사업 스토리까지\n매주마다 알 수 있어요!`}
        cards={relatedCards}
      />
    </div>
  );
};

export default MarketDetailPage;
