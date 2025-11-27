import { useRef, useEffect, useId } from "react";
import classNameMerge from "@/shared/classNameMerge";
import {
  CHECKBOX_STYLES,
  CHECKBOX_LABEL_STYLES,
} from "@/shared/styles/checkbox";
import ICON_SRC_MAPPING from "@/shared/constants/iconSrcMapping";
import type { CheckBoxProps } from "@/shared/types/checkBoxTypes";

const CheckBox_Old = ({
  // 1. 상태 제어
  checked,
  indeterminate = false,

  // 2. 이벤트 핸들러
  onChange,

  // 3. 접근성/상태
  isDisabled = false,

  // 4. 표시
  label,

  // 5. 스타일링
  labelClassName,
  className,
}: CheckBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxId = useId(); // 접근성을 위한 고유 ID 생성

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label
      htmlFor={checkboxId}
      className={classNameMerge(
        "inline-flex min-w-fit items-center",
        !isDisabled ? "cursor-pointer" : "pointer-events-none", // disabled일 때 상호작용 방지
        className
      )}
    >
      <div className="relative inline-flex items-center">
        <input
          ref={inputRef}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={isDisabled}
          className={classNameMerge(
            "absolute h-[18px] w-[18px] opacity-0",
            !isDisabled && "cursor-pointer" // disabled가 아닐 때만 커서 포인터
          )}
        />
        <div
          className={classNameMerge(
            CHECKBOX_STYLES.base,
            !isDisabled && CHECKBOX_STYLES.variants.hover,
            checked && !indeterminate && CHECKBOX_STYLES.variants.checked,
            indeterminate && CHECKBOX_STYLES.variants.indeterminate,
            isDisabled && CHECKBOX_STYLES.variants.disabled,
            CHECKBOX_STYLES.focus,
            "flex h-[18px] w-[18px] items-center justify-center"
          )}
        >
          {indeterminate ? (
            <div className="h-[2px] w-[10px] rounded-sm bg-white" />
          ) : checked ? (
            <img
              src={ICON_SRC_MAPPING.ic_check}
              alt="check"
              className="h-[18px] w-[18px]"
            />
          ) : null}
        </div>
      </div>
      {label && (
        <span
          className={classNameMerge(
            CHECKBOX_LABEL_STYLES.base,
            isDisabled
              ? CHECKBOX_LABEL_STYLES.variants.disabled
              : CHECKBOX_LABEL_STYLES.variants.enabled,
            "ml-2 inline-flex items-center leading-none",
            labelClassName
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckBox_Old;
