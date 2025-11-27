import type { StyleProps } from "../types";

export interface TextareaProps extends StyleProps {
  // 1. 기본 식별자
  id?: string;

  // 2. 핵심 데이터
  value?: string;
  placeholder?: string;

  // 3. 상태/제어
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isError?: boolean;
  isDarkMode?: boolean;
  rows?: number;

  // 4. 제한사항
  maxLength?: number;
  isInfinity?: boolean; // 높이 확장 여부

  // 5. 이벤트 핸들러
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;

  // 6. 스타일링
  textareaClassName?: string;

  // 7. 접근성
  title?: string; // 툴팁 텍스트
  name?: string; // form name
}
