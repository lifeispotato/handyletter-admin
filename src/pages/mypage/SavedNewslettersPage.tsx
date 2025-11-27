import { useState } from 'react';
import { Dropdown } from '../../shared/components/molecules/Dropdown';
import { ContentCard } from '../../shared/components/molecules/ContentCard';
import { Pagination } from '../../shared/components/molecules/Pagination';
import cardBg1 from '../../shared/assets/images/bg_card.jpg'; 

export const SavedNewslettersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. Page Title */}
      <h2 className="font-sans font-bold text-[20px] text-gray-7 mb-[20px] pb-[20px] border-b border-[#E6E8EB]">
        찜한 뉴스레터
      </h2>

      {/* 2. Filter / Sort Dropdown */}
      <div className="mb-[20px]">
        <Dropdown 
          defaultLabel="최신순"
          options={[
            { label: "최신순", value: "latest" },
            { label: "조회수 많은 순", value: "views" },
          ]}
          // Overriding styles to match the smaller look in MyPage
          className="w-auto"
        />
      </div>

      {/* 3. Card Grid (3 Columns) */}
      <div className="grid grid-cols-3 gap-5 mb-[60px]">
        {/* Generating 9 items for demo */}
        {Array.from({ length: 9 }).map((_, i) => (
          <ContentCard
            key={i}
            title="지금이 제철, 무화과 디저트 맛집"
            author="From. 핸디레터 MJ 에디터"
            imageUrl={cardBg1}
            className='h-[321px] w-[300px]'
            // First few have specific badges for demo matching screenshot
            badgeText={i % 2 === 0 ? undefined : "핸디 한정 판매"}
            isLiked={true} // Since this is "Saved" page, they should be liked
          />
        ))}
      </div>

      {/* 4. Pagination (Centered) */}
      <div className="flex justify-center">
        <Pagination 
          totalPage={5}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

    </div>
  );
};

export default SavedNewslettersPage;