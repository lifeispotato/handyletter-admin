import classNameMerge from "../../../classNameMerge";
import type { BasicInputProps } from "../../../types/inputTypes";
import { INPUT_BASE_VARIANT } from "../../../styles/input";

const BasicInput = ({
  // 1. 기본 식별자
  id,

  // 2. 핵심 데이터
  type = "text",
  value,
  placeholder,

  // 3. 상태/제어
  isDisabled,
  isRequired,
  isReadonly = false,

  // 4. 제한사항
  maxLength,

  // 5. 이벤트 핸들러
  onChange,
  onFocus,
  onBlur,
  onKeyDown,

  // 6. 스타일링
  inputClassName = "",
}: BasicInputProps) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      required={isRequired}
      readOnly={isReadonly}
      maxLength={maxLength}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className={classNameMerge(INPUT_BASE_VARIANT.default, inputClassName)}
    />
  );
};

export default BasicInput;
