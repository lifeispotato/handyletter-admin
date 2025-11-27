import type { StyleProps } from "../types";
import ICON_SRC_MAPPING from "../constants/iconSrcMapping";

// ICON_SRC_MAPPING의 키값만 허용
export type IconKey = keyof typeof ICON_SRC_MAPPING;

// 버튼 속성
export interface BasicButtonProps extends StyleProps {
  children?: React.ReactNode; // 버튼 내용
  isDisabled?: boolean; // 비활성화 여부
  type?: "button" | "submit" | "reset"; // 버튼 타입
  title?: string; // 툴팁 텍스트
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// 아이콘 버튼 속성
export interface IconButtonProps extends StyleProps {
  icon: string;
  iconClassName?: string;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  id?: string;
  onClick?: () => void;
  iconWrapper?: boolean; // 아이콘 wrapper 옵션 추가
}

// 페이지네이션 화살표 버튼 속성
export interface ArrowButtonProps extends StyleProps, BasicButtonProps {
  icon?: IconKey;
  direction?: "first" | "prev" | "next" | "last"; // 첫 페이지, 이전 페이지, 다음 페이지, 마지막 페이지 (자동 아이콘)
}

// 페이지네이션 페이지 버튼 속성
export interface PageButtonProps extends StyleProps, BasicButtonProps {
  icon?: IconKey;
  pageNumber: number;
}

// 드롭다운 속성
export interface DropdownProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends StyleProps {
  placeholder?: string;
  selectedItem?: T | null; // 선택된 아이템
  list: T[]; // 드롭다운 리스트
  labelKey: keyof T; // 라벨 키
  isDisabled?: boolean; // 비활성화 여부
  onChange: (item: T, index?: number) => void; // 변경 시 호출

  // 선택적 커스터마이징
  customIcon?: string;
  selectBoxClassName?: string;
  selectedItemTextClassName?: string;
  listTextClassName?: string;
}
