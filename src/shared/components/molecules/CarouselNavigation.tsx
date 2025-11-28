import { cn } from '../../lib/utils';
// Reusing the chevron icons we made for Pagination
import chevronLeft from '../../assets/icons/chevron_left.svg';
import chevronRight from '../../assets/icons/chevron_right.svg';

interface CarouselNavigationProps {
  onPrev?: () => void;
  onNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  className?: string;
}

export const CarouselNavigation = ({ 
  onPrev, 
  onNext, 
  disablePrev,
  disableNext,
  className 
}: CarouselNavigationProps) => {
  
  const buttonClass = cn(
    "w-[32px] h-[32px] flex items-center justify-center rounded-[4px] border border-[#D1D5D9] bg-white transition-all",
    "hover:bg-gray-50 hover:border-gray-400 active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Left Button */}
      <button 
        onClick={onPrev}
        disabled={disablePrev}
        className={buttonClass}
        aria-label="Previous slide"
      >
        <img src={chevronLeft} alt="" className="w-4 h-4" />
      </button>

      {/* Right Button */}
      <button 
        onClick={onNext}
        disabled={disableNext}
        className={buttonClass}
        aria-label="Next slide"
      >
        <img src={chevronRight} alt="" className="w-4 h-4" />
      </button>
    </div>
  );
};