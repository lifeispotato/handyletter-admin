import { NumericFormat } from "react-number-format";
import { cn } from "../../../utils/style";

interface NumericFormatInputProps {
  disabled?: boolean;
  placeholder?: string;
  inputClassName?: string;
  type?: "text" | "tel" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  isRequired?: boolean;
  maxLength?: number;
}

const NumericFormatInput: React.FC<NumericFormatInputProps> = ({
  disabled,
  placeholder,
  inputClassName,
  type,
  onChange,
  onBlur,
  value,
  isRequired,
  maxLength,
}: NumericFormatInputProps) => {
  return (
    <NumericFormat
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      thousandSeparator=","
      maxLength={maxLength}
      allowNegative={false} // 음수 false: 불허용, true: 허용
      className={cn(
        `h-full w-full
        rounded-[4px] px-[15px] py-[13px]
        font-[Pretendard] text-[15px] text-gray-700
        placeholder-gray-500 disabled:placeholder-gray-400
        focus:outline-none disabled:bg-gray-200`,
        inputClassName
      )}
      required={isRequired}
    />
  );
};

export default NumericFormatInput;
