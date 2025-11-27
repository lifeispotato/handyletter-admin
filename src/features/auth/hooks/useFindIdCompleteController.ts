import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import authApi from "../api/auth.api";
import { loadingState } from "../../../shared/store/loadingState";
import { useSetRecoilState } from "recoil";
import { AxiosError } from "axios";
import { errorHandler } from "../../../shared/utils/errorHandler";

const useFindIdCompleteController = () => {
  // =========================================================================
  // 공통
  // =========================================================================
  const location = useLocation();
  const authData = location.state?.authData;
  const setIsLoading = useSetRecoilState(loadingState);

  // =========================================================================
  // 아이디찾기
  // =========================================================================
  const { findId } = authApi();
  const [account, setAccount] = useState("");

  const findIdFunc = async () => {
    try {
      const response = (
        await findId({
          name: authData.user_name,
          phoneNumber: authData.phone_no,
        })
      ).data.data.content;
      setAccount(response.account);
      setIsLoading(false);
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (authData) {
      findIdFunc();
    }
  }, [authData]);

  return {
    account,
  };
};

export default useFindIdCompleteController;
