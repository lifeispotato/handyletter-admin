export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// api.ts send 함수 파라미터 타입 정의
export interface SendApiRequestType {
  method: HTTPMethod;
  url: string;
  data?: unknown;
  params?: Record<
    string,
    string | number | boolean | number[] | string[] | undefined
  >;
  headers?: Record<string, string>;
  responseType?: "json" | "blob" | "text" | "arraybuffer";
}

// api.ts send 함수 return 타입 정의
export interface SendApiResponseType<T = unknown> {
  data: T;
  status: number;
}

// get 파라미터 타입 정의, 추가 타입이 있을 경우 상속해서 사용
export interface GetListRequestType
  extends Record<
    string,
    string | number | number[] | boolean | string[] | undefined
  > {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  keyword?: string;
  cursor?: number;
  searchField?: string;
}

// get return 타입 정의 (제네릭)
export interface GetListApiResponseType<T> {
  data: {
    message: string;
    data: {
      content: T[];
      totalCount: number;
    };
  };
}

// get return 타입 정의 (제네릭)
export interface GetByIdApiResponseType<T> {
  data: {
    message: string;
    data: {
      content: T;
    };
  };
}

// get return 타입 정의 (제네릭)
export interface GetByIdOneDepthApiResponseType<T> {
  data: {
    content: T;
  };
}

export interface GetInfiniteListApiResponseType<T> {
  data: {
    data: {
      pageParams: number[];
      pages: {
        content: T[];
        totalCount: number;
      }[];
    };
  };
}

// 리스트 데이터 타입
export type ListDataType<T> = GetListApiResponseType<T>["data"]["data"];

// 단일 데이터 타입
export type ContentDataType<T> =
  GetListApiResponseType<T>["data"]["data"]["content"];
