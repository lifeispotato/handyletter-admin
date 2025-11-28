import cardBg1 from "@/shared/assets/images/bg_card.jpg";
import bgimg from "@/shared/assets/images/home_landing.png";
import { useState } from "react";
import { BrandDetailContent } from "../../widgets/BrandDetail/BrandDetailContent";
import { BrandDetailHeader } from "../../widgets/BrandDetail/BrandDetailHeader";
import { SliderSection } from "../../widgets/SliderSection/SliderSection";
import { CommentSidebar } from "../../widgets/CommentSidebar/CommentSidebar";

// Mock Data for Carousel
const relatedCards = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: "전주 한옥마을 분위기 체험하기",
  author: "From. 핸디레터 MJ 에디터",
  imageUrl: cardBg1,
  badgeText: i === 0 ? "핸디 한정 판매" : undefined,
  isLiked: true,
}));

export const BrandDetailPage = () => {
  // Toggle this to test Before/After states
  const [isSubscribed] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const commentCount = 50;

  return (
    <div className="w-full bg-white">
      {/* 1. Hero Header */}
      <BrandDetailHeader
        title="가양 골목길에 위치해 있는 숨겨진 이자카야"
        subtitle="핸디에디터가 직접 방문하고 좋았던 곳들만 소개해요"
        category="오늘의 브랜드"
        date="25.09.10"
        author="MJ 에디터"
        likeCount={100}
        commentCount={commentCount}
        imageUrl={bgimg}
        onCommentClick={() => setIsCommentOpen(true)}
      />

      {/* 2. Article Content (with Gate) */}
      <BrandDetailContent isSubscribed={isSubscribed} />

      {/* 4. Footer Carousel */}
      <SliderSection
        tagline="핸디레터 구독하면"
        description={`전체 숨겨진 맛집, 놀거리들과 성공한 사장님들의 사업 스토리까지\n매주마다 알 수 있어요!`}
        cards={relatedCards}
      />

      {/* Comment Sidebar */}
      <CommentSidebar
        isOpen={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
        commentCount={commentCount}
      />
    </div>
  );
};

export default BrandDetailPage;
