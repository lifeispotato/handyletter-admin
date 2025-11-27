import { useId, ChangeEvent } from "react"; // <-- Import ChangeEvent
import classNameMerge from "@/shared/classNameMerge";
import Radio from "../../atoms/inputs/Radio";
import type { RadioGroupProps as OriginalRadioGroupProps } from "@/shared/types/radioTypes";

// 1. Revert props back to the original (remove labelClassName)
type RadioGroupProps<T extends string | number> = OriginalRadioGroupProps<T>;

const RadioGroup = <T extends string | number>({
  options,
  value,
  onChange,
  direction = "vertical",
  className,
}: RadioGroupProps<T>) => {
  const groupId = useId(); // 라디오 그룹의 고유 name 생성

  // 2. Create a handler that matches the native input event
  const handleNativeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Find the original option value (since e.target.value is always a string)
    const selectedOption = options.find(
      (opt) => String(opt.value) === e.target.value
    );

    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div className={classNameMerge("flex", className)}>
      <div
        className={classNameMerge(
          direction === "horizontal"
            ? "flex flex-row items-start space-x-8"
            : "flex flex-col space-y-2"
        )}
      >
        {options.map((option) => {
          // 3. Create a unique ID for each radio
          const optionId = `${groupId}-${option.value}`;

          return (
            <Radio
              key={option.value}
              id={optionId} // <-- FIX: Pass the unique ID
              name={groupId}
              value={String(option.value)} // <-- FIX: Pass the 'value' prop
              valueText={option.label} // <-- FIX: Pass 'valueText' instead of 'label'
              checked={value === option.value}
              onChange={handleNativeOnChange} // <-- FIX: Pass the correct handler
            />
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
