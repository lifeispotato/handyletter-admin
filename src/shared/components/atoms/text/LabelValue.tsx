import classNameMerge from "@/shared/classNameMerge";
import { TEXT_LABEL_VALUE_VARIANT } from "@/shared/styles/text";
import CheckBoxGroup from "@/shared/components/molecules/inputs/CheckBoxGroup";
import { BUTTON_SECONDARY_BASE_VARIANT } from "@/shared/styles/button";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import BasicInput from "../inputs/BasicInput";
import Textarea from "@/shared/components/atoms/textarea/Textarea";
import { TEXTAREA_STYLES } from "@/shared/styles/textarea";
import RadioGroup from "../../molecules/inputs/RadioGroup";

interface LabelValueProps<T extends string = string> {
  label: string;
  variant: "text" | "input" | "textarea" | "checkbox" | "button" | "radio";

  // 공통 속성
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
  required?: boolean;
  error?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  // 값 관련 (variant에 따라 달라짐)
  value?: React.ReactNode;
  onChange?: (value: T) => void;

  // Input/Textarea 전용
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  rows?: number;

  // Select 전용
  options?: Array<{
    value: T;
    label: string;
    isDisabled?: boolean;
    checked?: boolean;
  }>;

  // 커스텀 렌더러
  renderValue?: () => React.ReactNode;
  labelAlign?: "start" | "center"; // 라벨 정렬 옵션 추가
}

export function LabelValue<T extends string = string>({
  label,
  variant,
  value,
  onChange,
  placeholder,
  type = "text",
  rows,
  options = [],
  renderValue,
  required = false,
  isDisabled = false,
  isReadOnly = false,
  labelClassName,
  valueClassName,
  className,
  labelAlign = "center",
}: LabelValueProps<T>) {
  const renderValueContent = () => {
    if (renderValue) {
      return renderValue();
    }

    switch (variant) {
      case "text":
        return (
          <span
            className={classNameMerge(
              TEXT_LABEL_VALUE_VARIANT.text,
              valueClassName,
              "block w-full"
            )}
            title={value as string}
          >
            {value}
          </span>
        );

      case "input":
        return (
          <BasicInput
            type={type}
            value={value as string}
            onChange={(e) => onChange?.(e.target.value as T)}
            placeholder={placeholder}
            isDisabled={isDisabled}
            inputClassName={valueClassName}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value as string}
            onChange={(e) => onChange?.(e.target.value as T)}
            placeholder={placeholder}
            isReadOnly={isReadOnly}
            isDisabled={isDisabled}
            textareaClassName={classNameMerge(
              valueClassName,
              TEXTAREA_STYLES.base
            )}
            rows={rows}
          />
        );

      case "checkbox":
        return (
          <CheckBoxGroup
            options={options}
            value={
              options
                ?.filter((option) => option.checked)
                .map((option) => option.value) || []
            }
            onChange={(selectedValues) => {
              if (onChange) {
                onChange(selectedValues.join(",") as T);
              }
            }}
            direction="vertical"
            isDisabled={isDisabled}
            className={valueClassName}
          />
        );

      case "radio":
        return (
          <RadioGroup
            options={options}
            value={value as string}
            onChange={(selectedValue) => {
              if (onChange) {
                onChange(selectedValue as T);
              }
            }}
            direction="horizontal"
            isDisabled={isDisabled}
            className={classNameMerge(valueClassName, "flex")}
          />
        );

      case "button":
        return (
          <BasicButton
            children={value as string}
            className={BUTTON_SECONDARY_BASE_VARIANT.secondary}
            isDisabled={isDisabled}
            onClick={() => onChange?.(value as T)}
          />
        );

      default:
        return null;
    }
  };

  const labelElement = (
    <span
      className={classNameMerge(
        TEXT_LABEL_VALUE_VARIANT.label,
        labelAlign === "start" ? "self-start pt-[2px]" : "", // start일 때 상단 정렬 + 약간의 패딩
        labelClassName
      )}
    >
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </span>
  );

  return (
    <div
      className={classNameMerge(
        "font-pretendard flex gap-[20px]",
        variant === "checkbox" || variant === "textarea"
          ? "items-start"
          : "items-center", // checkbox일 때는 상단 정렬
        className
      )}
    >
      {labelElement}
      <div className="min-w-0 flex-1 overflow-hidden">
        {renderValueContent()}
      </div>
    </div>
  );
}
