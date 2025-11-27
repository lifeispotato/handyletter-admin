import PretendardText from "../text/PretendardText";
import { cn } from "./../../../utils/style";

interface DateInputProps {
  value: string;
  disabled?: boolean;
  helperText?: string;
  labelText?: string;
  divClassName?: string;
  inputClassName?: string;
  isError?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
}

const DateInput = ({
  value,
  disabled,
  helperText,
  labelText,
  divClassName,
  inputClassName,
  isError,
  onChange,
  min,
}: DateInputProps) => {
  return (
    <div className="flex flex-col gap-[3px] w-full max-w-[338px]">
      {labelText && (
        <PretendardText
          className={`text-[16px] font-semibold ${
            isError ? "text-negative" : "text-gray-1000"
          }`}
        >
          {labelText}
        </PretendardText>
      )}
      <div
        className={cn(
          `relative h-[48px] max-w-[338px]
          rounded-[4px] border bg-white disabled:border-gray-400`,
          isError
            ? "border-negative focus-within:border-negative"
            : "border-gray-400 focus-within:border-primary",
          divClassName
        )}
      >
        <input
          type="date"
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={cn(
            `h-full w-full 
            rounded-[4px] 
            px-[15px] py-[13px] 
            font-[Pretendard] text-[15px] text-gray-1400 
            placeholder-gray-1000 disabled:placeholder-gray-1000 
            disabled:bg-gray-300 
            focus:outline-none`,
            inputClassName
          )}
          min={min}
        />
        <img
          src="/assets/admin/icons/ic_celendar_gray.png"
          alt=""
          className="absolute right-[15px] top-[15px] h-[18px] w-[18px] pointer-events-none"
        />
      </div>
      {helperText && (
        <PretendardText
          className={`text-[14px] font-medium ${
            isError ? "text-negative" : "text-gray-1000"
          }`}
        >
          {helperText}
        </PretendardText>
      )}
    </div>
  );
};

export default DateInput;
