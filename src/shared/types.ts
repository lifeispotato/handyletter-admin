export interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface TableRow {
  id: string | number;
  [key: string]: unknown;
}

export interface DropdownItem {
  label: string;
  value: string;
  title?: string;
}

export interface InputDropdownType {
  [key: string]: string | number | boolean | null | undefined;
}

export interface Column {
  key: string;
  title: string;
  type:
    | "checkbox"
    | "text"
    | "date"
    | "delButton"
    | "detailButton"
    | "button"
    | "dropdown"
    | "free";
  width?: string;
  position?: "center";
  includeAllInfo?: boolean;
  checked?: (row: string | number | TableRow) => boolean;
  onChange?: (row: string | number | TableRow) => void;
  format?: string;
  onClick?: (row: TableRow, index?: number) => void;
  btnText?: string;
  disabled?: boolean | ((row: TableRow) => boolean);
  customRender?: (
    col: Column,
    row: TableRow,
    index?: number
  ) => React.ReactNode;
}

export interface DetailColumnContent {
  type: "text" | "date" | "checkbox" | "img" | "free";
  isAlignStart?: boolean;
  key?: string;
  subTitle: string;
  isEdited?: boolean;
  format?: string;
  imageOriginName?: string;
  imageStoredName?: string;
  list?: Array<{
    text: string;
    isChecked: boolean;
    isDisabled: boolean;
  }>;
  customRender?: (
    col: DetailColumnContent,
    row: Record<string, unknown>
  ) => React.ReactNode;
}

export interface DetailColumn {
  title: string;
  isMargin?: boolean;
  content: DetailColumnContent[];
}
