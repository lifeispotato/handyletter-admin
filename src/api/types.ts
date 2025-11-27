export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ResponseType = "json" | "blob" | "text" | "arraybuffer";

export interface RequestBody {
  params?: Record<
    string,
    string | number | boolean | string[] | number[] | undefined
  >;
  headers?: Record<string, string>;
  responseType?: ResponseType;
  method: HttpMethod;
  url: string;
  data?: unknown;
}

export interface ResponseBody<T = unknown> {
  status?: number;
  message?: string;
  data?: T;
}

export interface ApiError {
  message?: string;
  error?: string;
  statusCode?: number;
  code?: string | number;
}
