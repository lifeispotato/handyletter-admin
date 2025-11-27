export interface TermsData {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  termsType: "BASIC" | "ADDITIONAL";
}

export interface GetTermsListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  termsType?: "BASIC" | "ADDITIONAL";
  keyword?: string;
  searchField?: string;
}

export interface GetTermsListResponse {
  data: {
    content: TermsData[];
    totalCount: number;
  };
}

export interface GetTermsDetailResponse {
  data: {
    content: TermsData;
  };
}

export interface PostTermsRequest {
  title: string;
  content: string;
  termsType: "BASIC" | "ADDITIONAL";
}

export interface PatchTermsRequest {
  title: string;
  content: string;
  termsType: "BASIC" | "ADDITIONAL";
}

export interface DeleteTermsRequest {
  ids: number[];
}
