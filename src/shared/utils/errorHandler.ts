import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { getRecoil } from "recoil-nexus";
import { messages } from "../constants/messages";
import { accessTokenState } from "../store/accessTokenState";

// 에러 메시지 추출 함수
function getErrorMessage(
  error:
    | AxiosError
    | {
        message: string;
        status: number;
        data: {
          code: number;
          message: string;
        };
      }
): string {
  const errorData = (error as AxiosError)?.response?.data;

  // AxiosError인 경우
  if (errorData && typeof errorData === "object" && "data" in errorData) {
    const innerData = (errorData as { data: { message: string } }).data;
    if (innerData && typeof innerData === "object" && "message" in innerData) {
      return innerData.message;
    }
  }

  // 커스텀 에러 타입 처리
  if (
    "data" in error &&
    typeof error.data === "object" &&
    "message" in error.data
  ) {
    return error.data.message;
  }
  return messages.error.serverError;
}

//에러 핸들러
function errorHandler(error: AxiosError): void {
  const currentToken = getRecoil(accessTokenState);
  
  // 더미 토큰인 경우 토스트를 표시하지 않음 (구조만 보기 위한 목적)
  if (currentToken === "dummy-token") {
    return;
  }

  const status = error?.status;

  switch (status) {
    case 401:
      break;

    case 403:
      break;

    case 500:
      toast(messages.toast.errorText_500);
      break;

    default:
      toast(getErrorMessage(error));
      break;
  }
}

export { errorHandler };
