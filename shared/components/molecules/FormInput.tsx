import { type InputHTMLAttributes, type ReactNode, useState } from 'react';
import { cn } from '../../lib/utils';
import xCircleUrl from '../../assets/icons/x.svg';
import eyeOpenUrl from '../../assets/icons/eye_open.svg';
import eyeCloseUrl from '../../assets/icons/eye_close.svg';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffixIcon?: ReactNode; 
  onClear?: () => void; 
}

export const FormInput = ({ 
  label, 
  error, 
  className, 
  disabled, 
  value, 
  onClear, 
  suffixIcon,
  type, // We capture the type prop
  ...props 
}: FormInputProps) => {
  
  const [isFocused, setIsFocused] = useState(false);
  
  // Logic for Password Toggling
  const isPasswordType = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Determine the actual input type to render
  const inputType = isPasswordType 
    ? (isPasswordVisible ? 'text' : 'password') 
    : type;

  // Value check for Clear Icon
  const hasValue = value !== undefined && value !== null && String(value).length > 0;

  return (
    <div className="flex flex-col gap-[5px] w-full ">
      
      {/* Label */}
      {label && (
        <label className="text-[15px] font-normal text-gray-6 ml-[5px]">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className={cn(
        "relative flex items-center w-full h-12 px-3 rounded-3xl border transition-all bg-white",
        "border-input-border",
        isFocused && !error && "shadow-[0px_0px_4px_1px_rgba(0,0,0,0.5)] border-gray-7",
        error && "border-error text-error",
        disabled && "bg-input-bg-disabled text-gray-5 cursor-not-allowed",
        className
      )}>
        
        <input
          type={inputType} // Use our calculated type
          className={cn(
            "w-full bg-transparent outline-none text-[15px] leading-[21.25px] placeholder-gray-4",
            disabled ? "text-gray-5" : "text-gray-7"
          )}
          disabled={disabled}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 ml-2 shrink-0">
          
          {/* 1. Clear Button (Only shows if NOT password type, or if you prefer both) */}
          {/* Usually we don't show clear X on password fields, but if you want it, keep it. 
              Here I hide it if it's a password field to avoid cluttering the Eye icon. */}
          {!isPasswordType && !disabled && hasValue && onClear && (
             <button type="button" onClick={onClear} className="cursor-pointer flex items-center justify-center" tabIndex={-1}>
                <img src={xCircleUrl} alt="clear" className="w-4 h-4" />
             </button>
          )}
          
          {/* 2. Automatic Password Toggle */}
          {isPasswordType && !disabled && (
            <button 
              type="button" 
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="cursor-pointer flex items-center justify-center focus:outline-none transition-transform active:scale-95"
              tabIndex={-1}
            >
              <img 
                // Animation Key: Changing key forces React to re-mount the img, triggering animation if CSS used, 
                // or simply use standard src swap with transition classes
                key={isPasswordVisible ? "visible" : "hidden"}
                src={isPasswordVisible ? eyeOpenUrl : eyeCloseUrl} 
                alt="toggle password" 
                className="w-4 h-4 animate-in fade-in duration-200" 
              />
            </button>
          )}

          {/* 3. Custom Suffix (if passed explicitly) */}
          {suffixIcon}
        </div>

      </div>

      {/* Error Message */}
      {error && (
        <span className="text-[13px] text-error ml-[5px]">
          {error}
        </span>
      )}
    </div>
  );
};