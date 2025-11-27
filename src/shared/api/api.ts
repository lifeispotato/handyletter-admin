import axios from "axios";
import { getRecoil, setRecoil } from "recoil-nexus";
import { accessTokenState } from "../store/accessTokenState";
import { logoutAlertModalState } from "../store/logoutAlertModalState";
import { SendApiRequestType, SendApiResponseType } from "../types/api.types";

// =========================================================================
// 메인 API 요청 인스턴스
// =========================================================================
const axiosInstance = axios.create({
  // baseURL: "https://api.secondchapter.co.kr/landas",
  // baseURL: "http://223.130.155.251:8088/landas/",
  // baseURL: "http://192.168.1.22:8080/landas",
  withCredentials: true, // 쿠키 자동 포함
});

// =========================================================================
// 로그 전용 인스턴스 (인터셉터 없음)
// =========================================================================
const logAxios = axios.create({
  withCredentials: true,
});

// =========================================================================
// 요청 인터셉터
// =========================================================================
axiosInstance.interceptors.request.use(async (config) => {
  const token = getRecoil(accessTokenState);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 토큰 리셋 요청은 로그를 남기지 않음
  if (config.url?.includes("/v1/auth/reset/token/manager")) {
    return config;
  }

  const logHeaders: Record<string, string> = {};
  if (token) {
    logHeaders["Authorization"] = `Bearer ${token}`;
  }

  await logAxios.post("/v1/admin-log", {
    headers: logHeaders,
  });

  return config;
});
// =========================================================================
// 응답 인터셉터
// =========================================================================
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      (error.response?.data?.code === 4011 ||
        error.response?.statusText === "Unauthorized") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "/v1/auth/reset/token/manager",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.data.accessToken;
        setRecoil(accessTokenState, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // 더미 토큰인 경우 모달을 띄우지 않음 (구조만 보기 위한 목적)
        const currentToken = getRecoil(accessTokenState);
        if (currentToken !== "dummy-token") {
          setRecoil(logoutAlertModalState, true);
        }
        return Promise.reject(err);
      }
    }

    if (error.response?.status === 403) {
      // 더미 토큰인 경우 모달을 띄우지 않음 (구조만 보기 위한 목적)
      const currentToken = getRecoil(accessTokenState);
      if (currentToken !== "dummy-token") {
        setRecoil(logoutAlertModalState, true);
      }
    }

    return Promise.reject(error);
  }
);

export const api = () => {
  const send = async <T>({
    method,
    url,
    data,
    params,
    headers,
    responseType,
  }: SendApiRequestType): Promise<SendApiResponseType<T>> => {
    const currentToken = getRecoil(accessTokenState);

    // 더미 응답 생성 함수
    const getDummyResponse = () => ({
      data: {
        data: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          page: 0,
          size: 10,
        },
        code: 2000,
        message: "success",
      } as any,
      status: 200,
    });

    try {
      const res = await axiosInstance.request<T>({
        url,
        method,
        params,
        data,
        headers: {
          ...headers,
        },
        responseType,
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      // 더미 토큰인 경우 조용히 더미 응답 반환 (구조만 보기 위한 목적)
      if (currentToken === "dummy-token") {
        // 네트워크 에러 또는 baseURL 없는 경우 더미 응답 반환
        if (
          axios.isAxiosError(error) &&
          (!error.response ||
            error.code === "ECONNREFUSED" ||
            error.code === "ERR_NETWORK")
        ) {
          return getDummyResponse();
        }
        // 다른 에러도 더미 응답 반환
        return getDummyResponse();
      }

      // 에러 로깅 또는 변환
      if (axios.isAxiosError(error)) {
        throw {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        };
      } else {
        throw {
          message: "Unexpected error occurred",
          status: 500,
        };
      }
    }
  };

  const get = <T>(
    url: string,
    params?: Record<
      string,
      string | number | boolean | number[] | string[] | undefined
    >,
    headers?: Record<string, string>,
    responseType?: "json" | "blob" | "text" | "arraybuffer"
  ) => {
    return send<T>({ method: "GET", url, params, headers, responseType });
  };

  const post = <T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => {
    return send<T>({ method: "POST", url, data, headers });
  };

  const put = <T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => {
    return send<T>({ method: "PUT", url, data, headers });
  };

  const patch = <T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => {
    return send<T>({ method: "PATCH", url, data, headers });
  };

  const del = <T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => {
    return send<T>({ method: "DELETE", url, data, headers });
  };

  return { get, post, put, patch, del };
};
