import { useRef, ChangeEvent } from "react";
import { cn } from "../../../utils/style";
import { StyleProps } from "../../../types";

interface TextAreaProps extends StyleProps {
  placeholder?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  maxLength?: number;
  isInfinity?: boolean;
  className?: string;
}

// 용도: 자동 높이 조절 텍스트 입력창
// #tag: #textarea #자동높이조절 #입력창

function TextArea({
  placeholder,
  value,
  onChange,
  onBlur,
  disabled,
  maxLength,
  isInfinity,
  className,
  style,
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      if (isInfinity || textareaRef.current.scrollHeight < 192) {
        textareaRef.current.style.padding = "13px 15px";
        textareaRef.current.style.overflowY = "hidden";
      } else {
        textareaRef.current.style.overflowY = "auto";
        textareaRef.current.style.padding = "13px 0px 13px 15px";
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    handleResizeHeight();
    onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const trimmedValue = e.target.value.trim();
    if (trimmedValue !== e.target.value) {
      e.target.value = trimmedValue;
      onChange(e as unknown as ChangeEvent<HTMLTextAreaElement>);
    }
    onBlur?.(e);
  };

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        `
        w-[744px]
        p-[13px_15px] 
        text-gray-1400 text-[15px] font-normal
        leading-[21.25px] 
        rounded-[4px] border border-gray-400 bg-white
        placeholder-gray-500 text-gray-700
        focus:border-primary focus:outline-none
        `,
        isInfinity ? "max-h-[unset]" : "max-h-[192px]",
        className
      )}
      style={{
        ...style,
      }}
    />
  );
}

export default TextArea;
