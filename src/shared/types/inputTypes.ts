import type { StyleProps } from "../types";

export interface BasicInputProps {
  // 1. 기본 식별자
  id?: string;

  // 2. 핵심 데이터
  type?: string;
  value?: string;
  placeholder?: string;

  // 3. 상태/제어
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadonly?: boolean;
  isError?: boolean;

  // 4. 제한사항
  maxLength?: number;

  // 5. 이벤트 핸들러
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  // 6. 스타일링
  inputClassName?: string;
}

export interface FormInputProps extends StyleProps, BasicInputProps {
  // 1. 라벨 관련
  labelTitle?: string; // 제목
  labelClassName?: string;

  // 2. 상태/제어
  isError?: boolean; // 에러 상태 여부
  isDarkMode?: boolean; // 다크 모드 여부

  // 3. UI 도움말
  helperText?: string; // 도움말 텍스트
  helperTextClassName?: string;

  // 4. 브라우저 관련
  autoComplete?: string; // 자동 완성 옵션

  // 5. 접근성
  title?: string; // 툴팁 텍스트
  alt?: string; // 대체 텍스트
}

export interface SearchInputProps extends StyleProps, BasicInputProps {
  onClick?: () => void;
}

// 이미지 입력 필드 속성
export interface ImgInputProps extends StyleProps {
  id: string; // 고유 식별자
  accept: string; // 허용 파일 타입
  originValue: string | null; // 원본 값
  setValue: (value: string) => void;
  originName: string; // 원본 파일명
  storedName: string; // 저장된 파일명
  isRequired?: boolean; // 필수 입력 여부
  fileType: string; // 파일 타입
  multiple?: boolean; // 다중 파일 업로드 여부
}

// 파일 입력 필드 속성
export interface FileInputProps extends StyleProps {
  id: string; // 고유 식별자
  accept: string; // 허용 파일 타입
  originValue: string | null; // 원본 값
  setValue: (value: string) => void; // 값 설정 함수
  originName: string; // 원본 파일명
  storedName: string; // 저장된 파일명
  isRequired?: boolean; // 필수 입력 여부
  fileType: string; // 파일 타입
  multiple?: boolean; // 다중 파일 업로드 여부
}
