import { useState } from 'react';
import { HistoryItem } from '../../shared/components/molecules/HistoryItem';
import { Pagination } from '../../shared/components/molecules/Pagination';
import cardBg1 from '../../shared/assets/images/bg_card.jpg'; 

export const PurchasedPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. Page Title */}
      <h2 className="font-sans font-semibold text-[20px] text-gray-7 mb-[30px] pb-5 border-b border-[#E6E8EB]">
        구매한 체험
      </h2>

      {/* 2. List of Items */}
      <div className="flex flex-col gap-10 mb-20">
        <HistoryItem 
          date="2025. 11. 11 화요일"
          storeName="파도상점"
          title="동해바다 키링만들기"
          purchaseDate="구매일자 2024.11.11"
          imageUrl={cardBg1}
        />
        <HistoryItem 
          date="2025. 11. 11 화요일"
          storeName="파도상점"
          title="동해바다 키링만들기"
          purchaseDate="구매일자 2024.11.11"
          imageUrl={cardBg1}
        />
        <HistoryItem 
          date="2025. 11. 11 화요일"
          storeName="파도상점"
          title="동해바다 키링만들기"
          purchaseDate="구매일자 2024.11.11"
          imageUrl={cardBg1}
        />
        <HistoryItem 
          date="2025. 11. 11 화요일"
          storeName="파도상점"
          title="동해바다 키링만들기"
          purchaseDate="구매일자 2024.11.11"
          imageUrl={cardBg1}
        />
      </div>

      {/* 3. Pagination */}
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

export default PurchasedPage;