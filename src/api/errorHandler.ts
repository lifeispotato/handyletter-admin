import { toast } from "react-toastify";
import {
  LOGIN_ERROR_MESSAGES,
  SIGNUP_ERROR_MESSAGES,
} from "../shared/constants/errorMessages";

// 서버 에러 응답 타입
export interface ApiErrorResponse {
  code: number;
  message: string;
}

// 네트워크 에러 타입 정의
export interface NetworkError {
  code: string;
  message: string;
  name: string;
}

// 에러 코드에 따른 클라이언트 메시지 반환
const getClientErrorMessage = (errorData: ApiErrorResponse): string => {
  const { code, message } = errorData;

  // 개발 환경에서 실제 에러 정보 로깅
  if (import.meta.env.DEV) {
    console.log("에러 정보:", { code, message });
  }

  // 로그인 관련 에러 처리
  if (code in LOGIN_ERROR_MESSAGES) {
    const clientMessage =
      LOGIN_ERROR_MESSAGES[code as keyof typeof LOGIN_ERROR_MESSAGES];
    if (import.meta.env.DEV) {
      console.log("로그인 에러 처리:", {
        original: message,
        client: clientMessage,
      });
    }
    return clientMessage;
  }

  // 회원가입 관련 에러 처리
  if (code in SIGNUP_ERROR_MESSAGES) {
    const clientMessage =
      SIGNUP_ERROR_MESSAGES[code as keyof typeof SIGNUP_ERROR_MESSAGES];
    if (import.meta.env.DEV) {
      console.log("회원가입 에러 처리:", {
        original: message,
        client: clientMessage,
      });
    }
    return clientMessage;
  }

  // 기타 에러는 서버 메시지 그대로 사용
  return message;
};

// 서버 에러 메시지를 토스트로 표시
export const showErrorToast = (errorData: ApiErrorResponse): void => {
  const clientMessage = getClientErrorMessage(errorData);

  toast.error(clientMessage, {
    toastId: `error-${errorData.code}`, // 같은 에러 코드는 중복 방지
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * 에러 코드 체크 헬퍼 함수들
 */
export const isAuthExpired = (code: number): boolean => code === 4001;
export const isUnauthorized = (code: number): boolean => code === 4002;

/**
 * 네트워크 에러 메시지 처리
 */
export const getNetworkErrorMessage = (error: NetworkError): string => {
  const { code, message } = error;

  // 개발 환경에서 에러 정보 로깅
  if (import.meta.env.DEV) {
    console.log("네트워크 에러:", { code, message });
  }

  switch (code) {
    case "ERR_CONNECTION_TIMED_OUT":
      return "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
    case "ERR_CONNECTION_REFUSED":
      return "서버가 응답하지 않습니다. 서버 상태를 확인해주세요.";
    case "ERR_NETWORK":
      return "네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.";
    case "ERR_INTERNET_DISCONNECTED":
      return "인터넷 연결이 끊어졌습니다. 네트워크를 확인해주세요.";
    default:
      return "서버와의 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};

/**
 * 네트워크 에러 토스트 표시
 */
export const showNetworkErrorToast = (error: NetworkError): void => {
  const message = getNetworkErrorMessage(error);

  toast.error(message, {
    toastId: `network-error-${error.code}`,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
