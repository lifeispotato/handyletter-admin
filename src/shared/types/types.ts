// 공통 스타일 속성
export interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}

// 이미지 속성
export interface ImageProps extends StyleProps {
  src: string;
  activeSrc?: string; // 호버/활성 상태 이미지
  alt?: string; // 이미지 대체 텍스트
  loading?: "lazy" | "eager"; // 이미지 로딩 옵션(lazy: 늦은 로딩, eager: 즉시 로딩)
  title?: string; // 툴팁 텍스트
  id?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// 모달/오버레이 속성
export interface ModalProps extends StyleProps {
  isOpen: boolean;
  closeOnBackdropClick?: boolean; // 배경 클릭 시 닫기
  closeOnEsc?: boolean; // ESC 키로 닫기
  zIndex?: number; // 레이어 순서
  title?: string; // 툴팁 텍스트
  alt?: string; // 대체 텍스트
  id?: string;
  onClose: () => void;
}
