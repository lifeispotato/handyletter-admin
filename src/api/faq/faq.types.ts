export interface FaqData {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  adminEmail: string;
}

export interface GetFaqListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
}

export interface GetFaqListResponse {
  data: {
    content: FaqData[];
    totalCount: number;
  };
}

export interface GetFaqDetailResponse {
  data: {
    content: FaqData;
  };
}

export interface PostFaqRequest {
  title: string;
  content: string;
}

export interface PatchFaqRequest {
  title: string;
  content: string;
}

export interface DeleteFaqRequest {
  ids: number[];
}
