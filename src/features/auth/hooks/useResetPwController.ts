import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { route } from "../../../routes/route";
import useMoveToPage from "../../../shared/hooks/useMoveToPage";
import { loadingState } from "../../../shared/store/loadingState";
import { errorHandler } from "../../../shared/utils/errorHandler";
import authApi from "../api/auth.api";

const useResetPwController = () => {
  // =========================================================================
  // 공통
  // =========================================================================
  const location = useLocation();
  const authData = location.state?.authData;
  const setIsLoading = useSetRecoilState(loadingState);
  const { moveToPage } = useMoveToPage();
  const { resetPw, findPw } = authApi();

  // =========================================================================
  // 아이디찾기
  // =========================================================================
  const [account, setAccount] = useState("");
  const [resetPwToken, setResetPwToken] = useState("");

  const findIdFunc = async () => {
    try {
      setIsLoading(true);

      const response = (
        await findPw({
          name: authData.user_name,
          phoneNumber: authData.phone_no,
        })
      ).data.data.content;
      setAccount(response.account);
      setResetPwToken(response.resetPwToken);
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authData) {
      findIdFunc();
    }
  }, [authData]);

  // =========================================================================
  // 비밀번호 재설정
  // =========================================================================
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 비밀번호 일치 여부 (둘 다 빈 문자열이 아닐 때만 비교)
  const isPasswordMatch = useMemo(() => {
    if (password.trim() !== "" && passwordCheck.trim() !== "") {
      return password === passwordCheck;
    } else {
      return true;
    }
  }, [password, passwordCheck]);

  // 비밀번호 오류 여부
  const passwordError = useMemo(() => {
    if (!password) return undefined;

    if (password.length < 8) {
      return "비밀번호를 8자 이상으로 입력해 주세요.";
    }

    // 영문, 숫자, 특수문자 각각 정규식
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

    const count = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length;

    if (count < 2 || password.length > 16) {
      return "비밀번호 조합이 올바르지 않습니다.";
    }

    return undefined;
  }, [password]);

  // 비밀번호체크 오류 여부
  const passwordCheckError = useMemo(() => {
    if (password.trim() !== "" && passwordCheck.trim() !== "" && password !== passwordCheck) {
      return "비밀번호가 일치하지 않습니다";
    }
  }, [password, passwordCheck]);

  const resetPassword = async () => {
    try {
      setIsLoading(true);
      if (!password || !passwordCheck) {
        return toast("값을 입력해주세요");
      }

      await resetPw({
        account,
        password,
        resetPwToken: resetPwToken,
      });

      moveToPage(route.reset_pw_complete, () => {}, { replace: true });
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    resetPassword,
    isPasswordMatch,
    passwordError,
    passwordCheckError,
  };
};

export default useResetPwController;
