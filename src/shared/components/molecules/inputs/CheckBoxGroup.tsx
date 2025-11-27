import classNameMerge from "@/shared/classNameMerge";
import CheckBox from "../../atoms/inputs/CheckBox-Old";
import type { CheckBoxGroupProps } from "@/shared/types/checkBoxTypes";

const CheckBoxGroup = <T extends string | number>({
  options,
  value,
  onChange,
  direction = "vertical",
  isDisabled = false,
  className,
  labelClassName,
}: CheckBoxGroupProps<T>) => {
  const handleOptionChange = (checked: boolean, optionValue: T) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={classNameMerge("flex w-full", className)}>
      <div
        className={classNameMerge(
          direction === "horizontal"
            ? "flex flex-row flex-wrap gap-4"
            : "flex flex-col space-y-2"
        )}
      >
        {options.map((option) => (
          <CheckBox
            key={option.value}
            checked={value.includes(option.value)}
            onChange={(checked) => handleOptionChange(checked, option.value)}
            isDisabled={isDisabled}
            label={option.label}
            labelClassName={labelClassName}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
