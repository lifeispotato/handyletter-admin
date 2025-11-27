import type { LiHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
// Import your downloaded SVG here. 
// Ensure the file exists at this path or update the name.
import arrowIcon from '../../assets/icons/right.svg';

interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  label: string;
  isActive?: boolean;
}

export const MenuItem = ({ 
  label, 
  isActive = false, 
  className, 
  onClick,
  ...props 
}: MenuItemProps) => {
  return (
    <li
      onClick={onClick}
      className={cn(
        // Base Layout: 255px width, 53px height, Flexbox
        "w-[255px] h-[53px] flex items-center justify-between px-4 rounded-lg cursor-pointer transition-colors list-none",
        
        // Typography (Pretendard SemiBold 15px)
        "font-sans font-semibold text-[15px] leading-[24.5px]",
        
        // State 1: Default
        !isActive && "bg-input-bg-disabled text-[#525252] hover:bg-gray-200",
        
        // State 2: Active
        isActive && "bg-[#34C9871A] text-primary",
        
        className
      )}
      {...props}
    >
      {/* Label Text */}
      <span>{label}</span>

      {/* Right Arrow Icon */}
      {/* Note: If you need the icon to change color (Green/Gray), 
          you might need two SVGs or use a CSS filter. 
          For now, using the image tag as requested. */}
      <img 
        src={arrowIcon} 
        alt="" 
        className="w-4 h-4" 
      />
    </li>
  );
};