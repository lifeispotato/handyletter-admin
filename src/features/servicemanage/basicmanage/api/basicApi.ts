export interface Member {
  id: number;
  createdAt: string;
  updatedAt: string;
  account: string;
  name: string;
  phoneNumber: string;
}

export interface GetMemberQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "DESC" | "ASC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
}

export interface GetMemberResponse {
  message: string;
  data: {
    content: Member[];
    totalCount?: number;
  };
}
