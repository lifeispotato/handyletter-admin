import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export interface PostMessageData {
  type: string;
  data?: any;
  message?: string;
}

interface UseAuthOptions {
  onAuthSuccess?: (data: any) => void;
  onAuthError?: (message: string) => void;
}

const useAuth = ({ onAuthSuccess, onAuthError }: UseAuthOptions = {}) => {
  const location = useLocation();

  useEffect(() => {
    // postMessage 이벤트 리스너 설정 (팝업에서 결과 받기)
    const handleMessage = (event: MessageEvent<PostMessageData>) => {
      // 메시지 타입에 따라 처리
      if (event.data.type === "AUTH_COMPLETE") {
        if (onAuthSuccess) {
          onAuthSuccess(event.data.data);
        }
      } else if (event.data.type === "AUTH_ERROR") {
        const errorMessage =
          "본인인증에 실패했습니다: " + (event.data.message || "");
        toast.error(errorMessage);

        if (onAuthError) {
          onAuthError(event.data.message || "");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onAuthSuccess, onAuthError]);

  useEffect(() => {
    // 팝업창인지 감지
    const isInPopup =
      window.opener !== null ||
      window.parent !== window ||
      window.location !== window.parent.location ||
      window.name === "auth_popup";

    // URL 파라미터에서 인증 결과 데이터 추출
    const params = new URLSearchParams(location.search);

    const resultData = {
      success: params.get("res_cd") === "0000",
      res_cd: params.get("res_cd"),
      res_msg: params.get("res_msg")
        ? decodeURIComponent(params.get("res_msg") || "")
        : "",
      phone_no: params.get("phone_no"),
      user_name: params.get("user_name")
        ? decodeURIComponent(params.get("user_name") || "")
        : "",
      birth_day: params.get("birth_day"),
      sex_code: params.get("sex_code"),
      comm_id: params.get("comm_id"),
    };

    // 모바일에서 URL 파라미터로 직접 접근한 경우 처리
    if (params.get("res_cd") === "0000" && !isInPopup) {
      if (onAuthSuccess) {
        onAuthSuccess({
          user_name: params.get("user_name") || "",
          phone_no: params.get("phone_no") || "",
        });
      }
      return;
    }

    // 팝업창에서 실행된 경우 부모 창에 결과 전달
    if (isInPopup) {
      const messageData = {
        type: resultData.success ? "AUTH_COMPLETE" : "AUTH_ERROR",
        data: resultData,
        message: resultData.res_msg,
      };

      // 다양한 방법으로 부모 창에 메시지 전달 시도
      try {
        if (window.opener) {
          window.opener.postMessage(messageData, window.location.origin);
        }
        if (window.parent && window.parent !== window) {
          window.parent.postMessage(messageData, window.location.origin);
        }
      } catch (error) {
        console.error("메시지 전송 오류:", error);
      }

      // 잠시 후 팝업창 닫기
      setTimeout(() => {
        try {
          window.close();
        } catch (error) {
          console.error("창 닫기 오류:", error);
        }
      }, 10);
    }
  }, [location, onAuthSuccess, onAuthError]);
};

export default useAuth;
