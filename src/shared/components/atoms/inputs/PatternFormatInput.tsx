import { PatternFormat } from "react-number-format";
import { cn } from "../../../utils/style";

interface PatternFormatInputProps {
  disabled?: boolean;
  placeholder?: string;
  inputClassName?: string;
  type?: "text" | "tel" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  format: string;
  isRequired?: boolean;
  maxLength?: number;
}

const PatternFormatInput: React.FC<PatternFormatInputProps> = ({
  disabled,
  placeholder,
  inputClassName,
  type,
  onChange,
  onBlur,
  value,
  format,
  isRequired,
  maxLength,
}) => {
  return (
    <PatternFormat
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      format={format}
      className={cn(
        `h-full w-full
        rounded-[4px] px-[15px] py-[13px]
        font-[Pretendard] text-[15px] text-gray-700
        placeholder-gray-500 disabled:placeholder-gray-400
        focus:outline-none disabled:bg-gray-200`,
        inputClassName
      )}
      required={isRequired}
      maxLength={maxLength}
    />
  );
};

export default PatternFormatInput;
