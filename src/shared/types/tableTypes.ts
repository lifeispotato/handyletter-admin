export interface TableCellProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface TableHeaderCellProps extends TableCellProps {
  width?: string;
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableColumn<T> {
  // 1. 기본 구성
  key: string;
  title: string;
  width?: string | number;
  className?: string;

  // 2. 표시/정렬
  align?: "left" | "center" | "right";

  // 3. 렌더링
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  // 1. 데이터
  columns: TableColumn<T>[];
  data: T[];

  // 2. 선택 기능
  selectable?: {
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
  };

  // 3. 스타일링
  className?: string;
}
