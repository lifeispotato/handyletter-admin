import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import uncheckedIcon from '../../assets/icons/checkbox_unchecked.svg';
import checkedIcon from '../../assets/icons/checkbox_checked.svg';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelClassName?: string; // Added optional prop for the text styling
}

export const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  className,
  labelClassName, // Destructure the new prop
  disabled,
  ...props 
}: CheckboxProps) => {
  return (
    <label 
      className={cn(
        "flex items-center gap-[11px] cursor-pointer select-none group",
        disabled && "opacity-50 cursor-not-allowed",
        className // Applies to the outer container
      )}
    >
      {/* Hidden Real Input for Accessibility/Forms */}
      <input 
        type="checkbox" 
        className="hidden" 
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        {...props}
      />

      {/* Custom Checkbox Image */}
      <img 
        src={checked ? checkedIcon : uncheckedIcon} 
        alt={checked ? "checked" : "unchecked"} 
        className="w-5 h-5 shrink-0" 
      />

      {/* Label Text */}
      <span 
        className={cn(
          "font-sans font-medium text-[15px] leading-[21.5px] text-gray-7",
          labelClassName // Applies specific styles to the text
        )}
      >
        {label}
      </span>
    </label>
  );
};