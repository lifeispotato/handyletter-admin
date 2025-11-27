import { type ChangeEvent, useId } from "react";
import classNameMerge from "@/shared/utils/classNameMerge";
import type { TextareaProps } from "@/shared/types/textareaTypes";
import { TEXTAREA_STYLES } from "@/shared/styles/textarea";
import { useAutoResize } from "@/shared/hooks/useAutoResize";

const Textarea = ({
  // 1. 기본 식별자
  id,

  // 2. 핵심 데이터
  value,
  placeholder,

  // 3. 상태/제어
  isDisabled = false,
  isRequired = false,
  isReadOnly = false,
  isError = false,
  isDarkMode = false,
  rows = 3,

  // 4. 제한사항
  maxLength,
  isInfinity = false,

  // 5. 이벤트 핸들러
  onChange,
  onFocus,
  onBlur,
  onKeyDown,

  // 6. 스타일링
  className = "",
  style = {},
  textareaClassName = "",

  // 7. 접근성
  title,
  name,
}: TextareaProps) => {
  // id가 제공되지 않으면 고유 ID 자동 생성
  const autoId = useId();
  const textareaId = id || autoId;
  
  const { textareaRef, resizeHeight } = useAutoResize(value || "", isInfinity);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // 글자수 제한 처리
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }

    resizeHeight();
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // 앞뒤 공백 제거
    const trimmedValue = e.target.value.trim();
    if (trimmedValue !== e.target.value) {
      e.target.value = trimmedValue;
      onChange?.(e as unknown as ChangeEvent<HTMLTextAreaElement>);
    }

    onBlur?.(e);
  };

  return (
    <div
      className={classNameMerge(["relative w-fit", className])}
      style={style}
    >
      <textarea
        ref={textareaRef}
        id={textareaId}
        name={name || textareaId}
        rows={rows}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        placeholder={placeholder}
        value={value}
        title={title}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        className={classNameMerge([
          TEXTAREA_STYLES.base,
          isError && TEXTAREA_STYLES.variants.error,
          isDisabled && !isDarkMode && TEXTAREA_STYLES.variants.disabled,
          isDarkMode && !isDisabled && TEXTAREA_STYLES.variants.dark,
          isDarkMode && isDisabled && TEXTAREA_STYLES.variants["dark-disabled"],
          isInfinity
            ? TEXTAREA_STYLES.variants["height-infinity"]
            : TEXTAREA_STYLES.variants["height-normal"],
          textareaClassName,
        ])}
      />
    </div>
  );
};

export default Textarea;
