import type { StyleProps } from "../types";

export interface BasicTextProps extends StyleProps {
  // 1. 기본 식별자
  id?: string;

  // 2. 핵심 데이터
  children?: React.ReactNode;

  // 3. HTML 속성
  title?: string; // 툴팁

  // 4. 이벤트 핸들러
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  // 5. 스타일링
  className?: string;
}
