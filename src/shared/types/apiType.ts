// Core Types - 핵심 공통 타입
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ResponseType = "json" | "blob" | "text" | "arraybuffer";

// Request & Response - 요청/응답 기본 구조

// 기본 요청 설정
export interface RequestBody {
  params?: Record<
    string,
    string | number | boolean | string[] | number[] | undefined
  >;
  headers?: Record<string, string>;
  responseType?: ResponseType;
}

// API 요청 타입
export interface ApiRequest extends RequestBody {
  method: HttpMethod;
  url: string;
  data?: unknown;
}

// 성공 응답
export interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
}

// 에러 응답
export interface ApiError {
  message?: string;
  error?: string;
  statusCode?: number;
  code?: string | number;
}

// Core Interfaces - 핵심 서비스 인터페이스

// HTTP 클라이언트
export interface HttpClient {
  get<T>(url: string, body?: RequestBody): Promise<ApiResponse<T>>;
  post<T>(
    url: string,
    data?: unknown,
    body?: RequestBody
  ): Promise<ApiResponse<T>>;
  put<T>(
    url: string,
    data?: unknown,
    body?: RequestBody
  ): Promise<ApiResponse<T>>;
  patch<T>(
    url: string,
    data?: unknown,
    body?: RequestBody
  ): Promise<ApiResponse<T>>;
  delete<T>(url: string, body?: RequestBody): Promise<ApiResponse<T>>;
}

// 인증 서비스
export interface AuthService {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
  refreshToken(): Promise<string>;
  logout(): void;
}

// 저장소 추상화
export interface Storage {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

// Common Response Types - 자주 쓰는 응답 타입

// 페이지네이션
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 리스트
export interface ListResponse<T> {
  items: T[];
  total: number;
}

// 성공/실패
export interface StatusResponse {
  success: boolean;
  message?: string;
}

// Utility Types - 유틸리티
// API 응답에서 data만 추출
export type ApiData<T> = T extends ApiResponse<infer U> ? U : never;

// Type Guards
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("message" in error || "error" in error || "statusCode" in error)
  );
}
