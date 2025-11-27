export interface ManagerData {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  approval: boolean;
  activation: boolean;
  role: string;
  accessMenu: string;
}

export interface GetManagerListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  approval?: boolean;
  keyword?: string;
  searchField?: string;
}

export interface GetManagerListResponse {
  data: {
    content: ManagerData[];
    totalCount: number;
  };
}

export interface GetManagerMyInfoResponse {
  data: {
    content: ManagerData;
  };
}

export interface GetManagerDetailResponse {
  data: {
    content: ManagerData;
  };
}

export interface PostManagerCheckAccountRequest {
  account: string;
}

// 아이디 중복 체크
export interface PostManagerCheckAccountResponse {
  data: {
    content: {
      isDuplicate: boolean;
    };
  };
}

export interface PatchManagerRequest {
  name: string;
  role: string;
  email: string;
  accessMenu: string;
  passwordChange: string;
  password: string;
}

export interface PatchManagerResponse {
  data: {
    content: {
      id: number;
    };
  };
}

export interface PatchManagerActivationRequest {
  activation: boolean;
}

export interface PatchManagerActivationResponse {
  data: {
    content: {
      id: number;
    };
  };
}

export interface PatchManagerApprovalResponse {
  data: {
    content: {
      id: number;
    };
  };
}

export interface DeleteManagerRequest {
  ids: number[];
}
