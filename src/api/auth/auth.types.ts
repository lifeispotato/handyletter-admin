export interface ResetTokenResponse {
  accessToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken?: string; // 옵셔널로 추가
  };
}

export interface SignupRequest {
  username: string;
  password: string;
  email: string;
  name: string;
  accessMenu: string;
}

export interface SignupResponse {
  data: {
    content: {
      id: number;
    };
  };
}
