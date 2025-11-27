import { ChangeEvent, KeyboardEvent } from "react";
import { cn } from "../../../utils/style";

interface DefaultInputProps {
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  inputClassName?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  isRequired?: boolean;
  maxLength?: number;
  readonly?: boolean;
  max?: number;
}

const DefaultInput = ({
  id,
  disabled,
  placeholder,
  inputClassName,
  type = "text",
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  value,
  isRequired,
  maxLength,
  readonly = false,
  max,
}: DefaultInputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      disabled={disabled}
      placeholder={placeholder}
      required={isRequired}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      maxLength={maxLength}
      readOnly={readonly}
      max={max}
      className={cn(
        `h-full w-full
        rounded-[4px] px-[15px] py-[13px]
        font-sans text-[15px] text-gray-700
        placeholder-gray-500 disabled:placeholder-gray-400 disabled:text-gray-400
        focus:outline-none disabled:bg-gray-200`,
        inputClassName
      )}
    />
  );
};

export default DefaultInput;
