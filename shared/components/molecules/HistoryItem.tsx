import { cn } from '../../lib/utils';

interface HistoryItemProps {
  /** The main date header (e.g. "2025. 11. 11 화요일") */
  date: string;
  /** Store name (e.g. "파도상점") */
  storeName: string;
  /** Main title (e.g. "동해바다 키링만들기") */
  title: string;
  /** Purchase date string (e.g. "구매일자 2024.11.11") */
  purchaseDate: string;
  /** Image URL */
  imageUrl: string;
  className?: string;
}

export const HistoryItem = ({
  date,
  storeName,
  title,
  purchaseDate,
  imageUrl,
  className
}: HistoryItemProps) => {
  return (
    // Main Container: width 952px (max-w used for responsiveness)
    <div className={cn("w-full max-w-[952px]  flex flex-col gap-[13px]", className)}>
      
      {/* 1. Date Header & Divider */}
      <div className="flex items-center w-full  gap-[13px]">
        {/* Date Text: Pretendard SemiBold 15px Gray-6 */}
        <span className="font-sans min-w-fit  font-semibold text-[15px] leading-[24.5px] text-gray-6">
          {date}
        </span>
        
        {/* Divider: 1.5px solid #E6E8EB */}
        <div className="w-full h-[1.5px] bg-[#E6E8EB]"></div>
      </div>

      {/* 2. Content Body (Image + Text) */}
      <div className="flex items-start gap-[30px]">
        
        {/* Left: Image (188x112, Radius 10px) */}
        <div className="shrink-0">
            <img 
            src={imageUrl} 
            alt={title} 
            className="w-[188px] h-28 rounded-[10px] object-cover bg-gray-100"
            />
        </div>

        {/* Right: Text Info */}
        <div className="flex flex-col h-28 justify-center gap-1.5">
          
          {/* Store Name: 16px Gray-6 */}
          <span className="font-sans text-[16px] font-medium text-gray-6 leading-none">
            {storeName}
          </span>
          
          {/* Title: 20px Gray-7 (Bold/SemiBold implied by size hierarchy) */}
          <h3 className="font-sans font-semibold text-[20px] text-gray-7 leading-tight mb-1">
            {title}
          </h3>
          
          {/* Purchase Date: 16px Gray-5 */}
          <span className="font-sans text-[16px] font-medium text-gray-5 leading-none">
            {purchaseDate}
          </span>

        </div>
      </div>

    </div>
  );
};