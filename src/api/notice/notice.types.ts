export interface NoticeData {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  adminEmail: string;
}

export interface GetNoticeListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
}

export interface GetNoticeListResponse {
  data: {
    content: NoticeData[];
    totalCount: number;
  };
}

export interface GetNoticeDetailResponse {
  data: {
    content: NoticeData;
  };
}

export interface PostNoticeRequest {
  title: string;
  content: string;
}

export interface PatchNoticeRequest {
  title: string;
  content: string;
}

export interface DeleteNoticeRequest {
  ids: number[];
}
