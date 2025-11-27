export interface ImageType {
  id?: number;
  imageOriginName: string;
  imageStoredName: string;
  temporaryUrl?: string;
  link?: string;
}

export interface FileType {
  fileOriginName: string;
  fileStoredName: string;
}

export interface SkippedRow {
  row: number;
  reason: string;
  data: {
    아이디: string;
    // 필요한 경우 다른 필드들도 추가
    [key: string]: any;
  };
}

export interface ErrorSummary {
  byReason: {
    [reason: string]: number;
  };
  total: number;
}

export interface ImportExcelResponseType {
  message: string;
  errorSummary: ErrorSummary;
  skippedRows: SkippedRow[];
}
