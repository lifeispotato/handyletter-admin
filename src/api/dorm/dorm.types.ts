export interface DormData {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  phoneNumber: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  roomCount: number;
  price: number;
}

export interface GetDormListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
}

export interface GetDormListResponse {
  data: {
    content: DormData[];
    totalCount: number;
  };
}

export interface GetDormDetailResponse {
  data: {
    content: DormData;
  };
}

export interface PostDormRequest {
  name: string;
  address: string;
  phoneNumber: string;
  roomCount: number;
  price: number;
}

export interface PatchDormRequest {
  name?: string;
  address?: string;
  phoneNumber?: string;
  roomCount?: number;
  price?: number;
  status?: "ACTIVE" | "INACTIVE" | "PENDING";
}

export interface DeleteDormRequest {
  ids: number[];
}

