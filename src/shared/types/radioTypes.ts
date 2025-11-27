export interface RadioProps {
  // 1. 상태 제어
  checked: boolean;

  // 2. 이벤트 핸들러
  onChange: (checked: boolean) => void;

  // 3. 접근성/상태
  isDisabled?: boolean;

  // 4. 표시
  label?: string;
  name?: string;
  value?: string;

  // 5. 스타일링
  className?: string;
}

export interface RadioGroupProps<T = string | number> {
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
  direction?: "horizontal" | "vertical";
  isDisabled?: boolean;
  className?: string;
}
