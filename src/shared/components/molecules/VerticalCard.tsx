import { cn } from '../../lib/utils';
import eyeIcon from '../../assets/icons/ic_eye.svg';

interface VerticalCardProps {
  /** Main title text (e.g. "골뱅이 소면") */
  title: string;
  /** View count number (e.g. 714) */
  viewCount: number;
  /** Background Image URL */
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

export const VerticalCard = ({
  title,
  viewCount,
  imageUrl,
  className,
  onClick
}: VerticalCardProps) => {
  return (
    // Main Frame: 298x436, Radius 10px, Padding 16px
    <div 
      onClick={onClick}
      className={cn(
        "relative w-[298px] h-[436px] rounded-[10px] overflow-hidden cursor-pointer group",
        className
      )}
    >
      {/* 1. Background Image */}
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* 2. Overlay (Optional: Gradient to make white text readable) */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

      {/* 3. Content Layer (Padding 16px) */}
      <div className="absolute inset-0 p-[16px] flex flex-col justify-between">
        
        {/* Spacer to push content down if needed, or Center Text */}
        <div className="flex-1 flex items-center justify-center">
           {/* Title Text: Pretendard SemiBold 18px White */}
           <h3 className="font-sans font-semibold text-[18px] leading-[26.5px] tracking-[-0.003em] text-white drop-shadow-md text-center">
             {title}
           </h3>
        </div>

        {/* 4. View Count Badge (Frame 1410117190) */}
        <div className="flex items-center justify-start">
          <div className="flex items-center gap-[3px] bg-[#00000099] rounded-[36px] h-[27px] px-[9px] backdrop-blur-sm">
            {/* Eye Icon (24x24) */}
            <img src={eyeIcon} alt="views" className="w-[24px] h-[24px]" />
            
            {/* Count Text (Assuming white to match icon) */}
            <span className="font-sans text-[13px] font-medium text-white">
              {viewCount.toLocaleString()}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};