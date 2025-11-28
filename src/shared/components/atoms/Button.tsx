import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'white' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode; 
  iconPosition?: 'left' | 'right'; // <--- Added new prop
  className?: string;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'right', // <--- Default to right
  className, 
  ...props 
}: ButtonProps) => {
  
  // Define base styles based on Figma specs (Radius 24px)
  const baseStyles = "inline-flex items-center justify-center gap-1 rounded-[24px] font-medium transition-colors cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/80", // Adjusted hover slightly for better contrast
    white: "bg-white text-[#144429] hover:bg-gray-100", 
    outline: "border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-[16px] h-[38px]", 
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)} 
      {...props}
    >
      {/* 1. Icon Left */}
      {icon && iconPosition === 'left' && (
        <span className="flex items-center justify-center shrink-0">{icon}</span>
      )}

      {/* Text */}
      <span>{children}</span>
      
      {/* 2. Icon Right (Default) */}
      {icon && iconPosition === 'right' && (
        <span className="flex items-center justify-center shrink-0">{icon}</span>
      )}
    </button>
  );
};