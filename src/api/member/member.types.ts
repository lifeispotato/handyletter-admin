export interface MemberData {
  id: number;
  createdAt: string;
  updatedAt: string;
  account: string;
  name: string;
  phoneNumber: string;
  email: string;
  marketingAgreement: boolean;
  serviceAgreement: boolean;
  advertisingAgreement: boolean;
}

export interface GetMemberListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
}

export interface GetMemberListResponse {
  data: {
    content: MemberData[];
    totalCount: number;
  };
}

export interface GetMemberDetailResponse {
  data: {
    content: MemberData;
  };
}

export interface GetHomeCountResponse {
  data: {
    activationCount: number;
    totalCount: number;
    retiredCount: number;
  };
}

export interface PatchMemberRequest {
  name: string;
  phoneNumber: string;
  email: string;
  marketingAgreement: boolean;
  serviceAgreement: boolean;
  advertisingAgreement: boolean;
}

export interface PatchMemberResponse {
  data: {
    content: {
      id: number;
    };
  };
}

export interface DeleteMemberRequest {
  ids: number[];
}
