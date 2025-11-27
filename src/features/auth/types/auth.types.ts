export interface LoginResponseType {
  data: {
    data: {
      accessToken: string;
    };
  };
}

export interface SignUpResponseType {
  id: number;
}

export interface UserInfoResponseType {
  id: number;
  createdAt: string;
  updatedAt: string;
  account: string;
  name: string;
  phoneNumber: string;
  approval: boolean;
  activation: boolean;
  role: string;
}

export interface CheckUserIdResponseType {
  isDuplicate: boolean;
}

export interface FindIdResponseType {
  account: string;
}

export interface FindPwResponseType {
  account: string;
  resetPwToken: string;
}
