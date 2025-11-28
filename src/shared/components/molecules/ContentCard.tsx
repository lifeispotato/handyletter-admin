import { useState } from 'react';
import { cn } from '../../lib/utils';
import heartEmpty from '../../assets/icons/heart_empty_white.svg';
import heartFilled from '../../assets/icons/heat_fill.svg';

interface ContentCardProps {
  title: string;
  author: string;
  imageUrl: string;
  /** Optional Badge Text (e.g. "핸디 한정 판매") */
  badgeText?: string;
  /** Initial Like State */
  isLiked?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ContentCard = ({ 
  title, 
  author, 
  imageUrl, 
  badgeText, 
  isLiked: initialLiked = false, 
  className,
  onClick 
}: ContentCardProps) => {
  
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        // Dimensions & Base Style
        "relative w-[408px] h-[321px] rounded-[10px] overflow-hidden cursor-pointer group",
        className
      )}
    >
      {/* 1. Background Image */}
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* 2. Gradient Overlay (From bottom to top) */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)"
        }}
      />

      {/* 3. Content Container (Padding 24px) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        
        {/* --- TOP ROW: Badge & Heart --- */}
        <div className="flex items-start justify-between">
          {/* Badge (Only renders if text provided) */}
          {badgeText ? (
            <span className="inline-flex items-center justify-center px-3 py-1.5 bg-white rounded-sm shadow-sm">
              <span className="text-[13px] font-bold text-primary leading-none">
                {badgeText}
              </span>
            </span>
          ) : <div /> /* Spacer if no badge */}

          {/* Heart Button */}
          <button 
            onClick={handleLike}
            className="w-8 h-8 flex rounded-3xl p-2 bg-[#00000099] items-center justify-center transition-transform active:scale-90 hover:opacity-80"
          >
            <img 
              src={isLiked ? heartFilled : heartEmpty} 
              alt="Like" 
              className="w-6 h-6 drop-shadow-md"
            />
          </button>
        </div>

        {/* --- BOTTOM ROW: Text Info --- */}
        <div className="flex flex-col gap-1.5">
          {/* Title */}
          <h3 className="font-sans font-semibold text-[24px] leading-[30px] text-white drop-shadow-sm line-clamp-2">
            {title}
          </h3>
          
          {/* Author */}
          <p className="font-sans text-[15px] text-gray-200 drop-shadow-sm">
            {author}
          </p>
        </div>

      </div>
    </div>
  );
};