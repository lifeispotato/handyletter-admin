export interface VideoContent {
  thumbnail?: string;
  fileName?: string;
  fileStoredName?: string;
}

export interface TodayBrandData {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  publishedAt: string;
  editorName: string;
  likeCount: number;
  commentCount: number;
  isHidden: boolean;
  newsletterType: "TODAY_BRAND" | "SHORT_FORM" | "STORY";
  videoContent?: VideoContent;
}

export interface GetTodayBrandListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
  newsletterType?: "TODAY_BRAND" | "SHORT_FORM" | "STORY";
}

export interface GetTodayBrandListResponse {
  data: {
    content: TodayBrandData[];
    totalCount: number;
  };
}

export interface GetTodayBrandDetailResponse {
  data: {
    content: TodayBrandData;
  };
}

export interface PostTodayBrandRequest {
  title: string;
  content: string;
  newsletterType: "TODAY_BRAND" | "SHORT_FORM" | "STORY";
}

export interface PatchTodayBrandRequest {
  title: string;
  content: string;
  isHidden?: boolean;
}

export interface DeleteTodayBrandRequest {
  ids: number[];
}

export interface ToggleHiddenRequest {
  id: number;
  isHidden: boolean;
}
