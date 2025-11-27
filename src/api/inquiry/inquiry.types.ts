// --- inquiry.types.ts ---

export interface InquiryData {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;

  // --- Fields Added to match image ---
  userId: string; // "아이디"
  inquiryType: string; // "문의 유형"
  status: "답변대기" | "답변완료"; // "답변상태"
  replyContent?: string;
}

export interface GetInquiryListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
}

export interface GetInquiryListResponse {
  data: {
    content: InquiryData[];
    totalCount: number;
  };
}

export interface GetInquiryDetailResponse {
  data: {
    content: InquiryData;
  };
}

export interface PostInquiryRequest {
  title: string; // You may want to rename this
  content: string;
}

export interface PatchInquiryRequest {
  title: string; // You may want to rename this
  content: string;
}

export interface DeleteInquiryRequest {
  ids: number[];
}
