import { cn } from '../../lib/utils';
import chevronLeft from '../../assets/icons/chevron_left.svg';
import chevronRight from '../../assets/icons/chevron_right.svg';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ 
  totalPage, 
  currentPage, 
  onPageChange, 
  className 
}: PaginationProps) => {
  
  // Helper to generate page numbers array [1, 2, 3, 4, 5]
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center gap-[10px]", className)}>
      
      {/* PREVIOUS BUTTON */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "w-[32px] h-[32px] flex items-center justify-center rounded-[4px] border transition-all",
          "bg-[#F7F7F9] border-[#E6E8EB]", // Default Light Gray bg
          "disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
        )}
      >
        <img src={chevronLeft} alt="Prev" className="w-4 h-4" />
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-2">
        {pages.map((page) => {
          const isActive = page === currentPage;
          
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[13px] font-bold leading-none transition-all",
                
                // Active State (Black Box)
                isActive 
                  ? "bg-[#262C31] text-white" 
                  : "bg-transparent text-[#808991] hover:bg-gray-100"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={() => onPageChange(Math.min(totalPage, currentPage + 1))}
        disabled={currentPage === totalPage}
        className={cn(
          "w-[32px] h-[32px] flex items-center justify-center rounded-[4px] border transition-all",
          "bg-[#F7F7F9] border-[#E6E8EB]",
          "disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
        )}
      >
        <img src={chevronRight} alt="Next" className="w-4 h-4" />
      </button>

    </div>
  );
};