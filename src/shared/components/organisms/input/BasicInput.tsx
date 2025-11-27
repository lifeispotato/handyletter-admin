import { useEffect, useRef, useState } from "react";
import DefaultInput from "../../atoms/inputs/DefaultInput";
import NumericFormatInput from "../../atoms/inputs/NumericFormatInput";
import PatternFormatInput from "../../atoms/inputs/PatternFormatInput";
import PretendardText from "../../atoms/text/PretendardText";
import { cn } from "./../../../utils/style";

interface BasicInputProps {
  className?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  labelText?: string;
  divClassName?: string;
  inputClassName?: string;
  isError?: boolean;
  type?: "text" | "tel" | "password";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  btnText?: string;
  btnTextDisable?: boolean;
  value: string;
  format?: string;
  inputType?: "default" | "numericFormat" | "patternFormat";
  isRequired?: boolean;
  maxLength?: number;
  useTimer?: boolean;
  timerSeconds?: number;
  onTimerEnd?: () => void;
  isTimerActive?: boolean;
  removeAllSpaces?: boolean;
  readonly?: boolean;
  blockKorean?: boolean;
  blockEmoji?: boolean;
  max?: number;
}

// 한글과 이모티콘 제거
const removeKoreanAndEmoji = (value: string) =>
  value.replace(/[\p{Script=Hangul}\p{Extended_Pictographic}]/gu, "");

const BasicInput: React.FC<BasicInputProps> = ({
  className,
  id,
  disabled,
  placeholder,
  helperText,
  labelText,
  divClassName,
  inputClassName,
  isError,
  type,
  onChange,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
  btnText,
  btnTextDisable,
  value,
  format,
  inputType = "default",
  isRequired,
  maxLength,
  useTimer,
  timerSeconds = 0,
  onTimerEnd,
  isTimerActive,
  removeAllSpaces = false,
  readonly = false,
  blockKorean = false,
  blockEmoji = false,
  max,
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (removeAllSpaces) {
      newValue = newValue.replace(/\s+/g, "");
    } else {
      newValue = newValue.trim();
    }
    if (newValue !== e.target.value) {
      e.target.value = newValue;
      onChange?.(e as React.ChangeEvent<HTMLInputElement>);
    }
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (blockKorean || blockEmoji) {
      newValue = removeKoreanAndEmoji(newValue);
      if (newValue !== e.target.value) {
        const event = {
          ...e,
          target: { ...e.target, value: newValue },
        };
        onChange?.(event as React.ChangeEvent<HTMLInputElement>);
        return;
      }
    }
    onChange?.(e);
  };

  const renderers = (inputType: string) => {
    const sharedProps = {
      type,
      id,
      disabled,
      placeholder,
      onChange: handleChange,
      onKeyDown: onKeyDown,
      onFocus: onFocus,
      onBlur: handleBlur,
      value,
      inputClassName,
      isRequired,
      maxLength,
      readonly,
    };

    switch (inputType) {
      case "default":
        return (
          <DefaultInput
            type={type}
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={handleBlur}
            value={value}
            inputClassName={inputClassName}
            isRequired={isRequired}
            maxLength={maxLength}
            max={max}
          />
        );

      case "numericFormat":
        return <NumericFormatInput {...sharedProps} />;
      case "patternFormat":
        if (!format) return null;
        return <PatternFormatInput {...sharedProps} format={format} />;
      default:
        return (
          <DefaultInput
            type={type}
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={handleBlur}
            value={value}
            inputClassName={inputClassName}
            isRequired={isRequired}
            maxLength={maxLength}
          />
        );
    }
  };

  // 타이머 로직
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (isTimerActive && timerSeconds > 0) {
      setTimeLeft(timerSeconds);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setTimeLeft(timerSeconds);
            onTimerEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, timerSeconds, onTimerEnd]);

  return (
    <div className={cn("flex flex-col gap-[3px]", className)}>
      {labelText && (
        <PretendardText
          className={`text-[16px] font-semibold ${
            isError ? "text-negative" : "text-gray-500"
          }`}
        >
          {labelText}
          {isRequired && "*"}
        </PretendardText>
      )}
      <div
        className={cn(
          `relative h-[48px] w-[338px] 
           rounded-[4px] border bg-white 
           disabled:border-gray-600`,
          isError
            ? "border-negative focus-within:border-negative"
            : "border-gray-400 focus-within:border-primary",
          divClassName
        )}
      >
        {renderers(inputType)}

        {btnText && (
          <button
            className={`absolute right-[15px] top-[50%] transform translate-y-[-50%]
              bg-primary hover:bg-primary/80 transition rounded-[4px]
              disabled:bg-gray-400
              flex items-center justify-center py-[3px] px-[6px]`}
            onClick={onClick}
            disabled={value.length <= 0 || btnTextDisable}
          >
            <PretendardText className={`text-[12px] font-semibold text-white`}>
              {btnText}
            </PretendardText>
          </button>
        )}
        {useTimer && (
          <PretendardText
            className={`absolute right-[15px] top-[50%] transform translate-y-[-50%]
              text-[15px] font-medium text-gray-500 `}
          >
            {formatTime(timeLeft)}
          </PretendardText>
        )}
      </div>

      {helperText && (
        <PretendardText
          className={`text-[14px] font-medium ${
            isError ? "text-negative" : "text-gray-500"
          }`}
        >
          {helperText}
        </PretendardText>
      )}
    </div>
  );
};

export default BasicInput;
