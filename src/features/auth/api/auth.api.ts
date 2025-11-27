import { api } from "../../../shared/api/api";
import {
  CheckUserIdResponseType,
  FindIdResponseType,
  FindPwResponseType,
  LoginResponseType,
  SignUpResponseType,
  UserInfoResponseType,
} from "../types/auth.types";
import { GetByIdApiResponseType } from "./../../../shared/types/api.types";

const authApi = () => {
  const { post, get } = api();

  // Basic Auth 헤더 생성 함수
  const getBasicAuthHeader = (userId: string, password: string) => {
    const credentials = `${userId}:${password}`;
    const encodedCredentials = btoa(credentials);
    return {
      Authorization: `Basic ${encodedCredentials}`,
    };
  };

  const login = async (data: {
    userId: string;
    password: string;
  }): Promise<LoginResponseType> => {
    const headers = getBasicAuthHeader(data.userId, data.password);
    return await post("/v1/auth/login/manager", null, {
      ...headers,
    });
  };

  const join = async (data: {
    userId: string;
    password: string;
    name: string;
    phoneNumber: string;
    accessMenu: string;
  }): Promise<GetByIdApiResponseType<SignUpResponseType>> => {
    const headers = getBasicAuthHeader(data.userId, data.password);
    return await post(
      "/v1/auth/sign/manager",
      {
        name: data.name,
        phoneNumber: data.phoneNumber,
        accessMenu: data.accessMenu,
      },
      {
        ...headers,
      }
    );
  };

  const checkUserId = async (data: {
    account: string;
  }): Promise<GetByIdApiResponseType<CheckUserIdResponseType>> => {
    return await post(`/v1/manager/check/account`, data);
  };

  const logout = async () => {
    return await post("/v1/auth/logout/manager");
  };

  const myInfo = async (): Promise<
    GetByIdApiResponseType<UserInfoResponseType>
  > => {
    return await get("/v1/manager/my-info");
  };

  const resetToken = async (): Promise<LoginResponseType> => {
    return await post("/v1/auth/reset/token/manager");
  };

  const findId = async (data: {
    name: string;
    phoneNumber: string;
  }): Promise<GetByIdApiResponseType<FindIdResponseType>> => {
    return await post("/v1/auth/find/account/manager", data);
  };

  const findPw = async (data: {
    name: string;
    phoneNumber: string;
  }): Promise<GetByIdApiResponseType<FindPwResponseType>> => {
    return await post("/v1/auth/find/password/manager", data);
  };

  const resetPw = async (data: {
    account: string;
    password: string;
    resetPwToken: string;
  }) => {
    const headers = getBasicAuthHeader(data.account, data.password);
    return await post(
      "/v1/auth/reset/password/manager",
      { resetPwToken: data.resetPwToken },
      {
        ...headers,
      }
    );
  };

  return {
    login,
    join,
    checkUserId,
    logout,
    myInfo,
    resetToken,
    findId,
    findPw,
    resetPw,
  };
};

export default authApi;
