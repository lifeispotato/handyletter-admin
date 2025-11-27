import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  showErrorToast,
  isAuthExpired,
  showNetworkErrorToast,
  type NetworkError,
} from "./errorHandler";

// 1. 타입 정의
interface SendParams {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

interface TokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// API 버전
export const API_VERSION = {
  V1: "v1",
  V2: "v2",
} as const;

// 2. 상수 및 설정
const baseURL = `${import.meta.env.VITE_API_URL}/`;

// 유틸리티 함수들
const cookieUtils = {
  get(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  },

  set(name: string, value: string, days: number = 7): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  },

  delete(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};

// 3. axios 인스턴스 생성
export const _axios = axios.create({
  baseURL: `${baseURL}${API_VERSION.V1}`,
  withCredentials: true,
});

// 4. 토큰 관리 시스템
class TokenManager {
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

  private processQueue(error: any, token: string | null = null): void {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });
    this.failedQueue = [];
  }

  redirectToLogin(): void {
    cookieUtils.delete("admin_token");
    sessionStorage.removeItem("admin_token");
    cookieUtils.delete("autoLogin");
    // window.location.href = '/login';
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const { data } = await axios.post<TokenResponse>(
      `${baseURL}${API_VERSION.V1}/auth/reset/token`,
      { refreshToken }
    );

    // 토큰 저장 (쿠키 + sessionStorage)
    cookieUtils.set("admin_token", data.data.accessToken);
    sessionStorage.setItem("admin_token", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    _axios.defaults.headers.common["Authorization"] =
      `Bearer ${data.data.accessToken}`;

    return data.data.accessToken;
  }

  handleTokenRefresh(originalRequest: any): Promise<AxiosResponse> {
    // 토큰 유효성 검증
    const activeToken =
      cookieUtils.get("admin_token") || sessionStorage.getItem("admin_token");
    const autoLoginCookie = cookieUtils.get("autoLogin");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!activeToken && !autoLoginCookie) {
      this.redirectToLogin();
      return Promise.reject(new Error("No valid session"));
    }

    if (!refreshToken) {
      this.redirectToLogin();
      return Promise.reject(new Error("No refresh token"));
    }

    // 이미 갱신 중이면 대기 큐에 추가
    if (this.isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        this.failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(_axios(originalRequest));
          },
          reject,
        });
      });
    }

    // 토큰 갱신 시작
    originalRequest._retry = true;
    this.isRefreshing = true;

    return new Promise<AxiosResponse>((resolve, reject) => {
      this.refreshToken()
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          this.processQueue(null, newToken);
          resolve(_axios(originalRequest));
        })
        .catch((err) => {
          this.processQueue(err, null);
          this.redirectToLogin();
          reject(err);
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    });
  }
}

const tokenManager = new TokenManager();

// 5. 인터셉터 설정
_axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 개발 환경에서 요청 로깅
    if (import.meta.env.MODE === "development") {
      console.group("API Request");
      console.log("URL:", config.url);
      console.log("Method:", config.method?.toUpperCase());
      console.log("Params:", config.params);
      console.log("Data:", config.data);
      console.groupEnd();
    }

    // 쿠키 또는 sessionStorage에서 토큰 읽기 (백업 방식)
    if (config.headers?.Authorization) {
      return config;
    }

    // Authorization 헤더가 없을 때만 토큰 추가
    const token =
      cookieUtils.get("admin_token") || sessionStorage.getItem("admin_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

_axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    const originalRequest = error.config;

    // 네트워크 에러 처리 (서버 응답이 없는 경우)
    if (!error.response) {
      const networkError: NetworkError = {
        code: error.code || "ERR_NETWORK",
        message: error.message || "Network Error",
        name: error.name || "AxiosError",
      };

      showNetworkErrorToast(networkError);
      return Promise.reject(error);
    }

    // 에러 코드 추출
    const errorCode = error.response?.data?.code;

    // 서버 에러 메시지를 토스트로 표시 (중앙 집중식 처리)
    if (error.response?.data?.code && error.response?.data?.message) {
      showErrorToast(error.response.data);
    }

    // 4001 에러 코드 처리 (인증 만료)
    if (errorCode && isAuthExpired(errorCode)) {
      tokenManager.redirectToLogin();
      return Promise.reject(error);
    }

    // 토큰 갱신이 필요한 경우
    const shouldRefreshToken =
      error.response &&
      (error.response.status === 403 ||
        (error.response.data && error.response.data.code === 40101)) &&
      !originalRequest._retry;

    if (shouldRefreshToken) {
      return tokenManager.handleTokenRefresh(originalRequest);
    }

    return Promise.reject(error);
  }
);

// 6. API 클래스
export default class api {
  private static getDefaultHeaders(): Record<string, string> {
    return {
      "Access-Control-Allow-Origin": "*",
      "X-Client-Path": window.location.pathname,
    };
  }

  static async send<T = any>({
    method,
    url,
    data,
    params,
    headers,
  }: SendParams): Promise<T> {
    const res = await _axios.request<T>({
      url,
      method,
      params,
      data,
      headers: {
        ...this.getDefaultHeaders(),
        ...headers,
      },
    });

    return res.data;
  }

  // HTTP 메서드별 래퍼 함수들
  static async get<T = any>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.send<T>({ method: "GET", url, params, headers });
  }

  static async post<T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.send<T>({ method: "POST", url, data, headers });
  }

  static async put<T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.send<T>({ method: "PUT", url, data, headers });
  }

  static async patch<T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.send<T>({ method: "PATCH", url, data, headers });
  }

  static async del<T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.send<T>({ method: "DELETE", url, data, headers });
  }

  static async fileForm<T = any>(
    url: string,
    file: File,
    method: "PUT" | "POST" = "PUT",
    path?: string,
    params?: Record<string, any>
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", `taekwon/dev/${path}`);

    return this.send<T>({
      url,
      method,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      params,
    });
  }
}
