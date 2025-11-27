import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { route } from "../../../routes/route";
import useMoveToPage from "../../../shared/hooks/useMoveToPage";
import { accessTokenState } from "../../../shared/store/accessTokenState";
import { loginInfoState } from "../../../shared/store/loginInfoState";
import { errorHandler } from "../../../shared/utils/errorHandler";
import authApi from "../api/auth.api";

const useLoginController = () => {
  const { login, myInfo } = authApi();
  const { moveToPage } = useMoveToPage();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setLoginInfo] = useRecoilState(loginInfoState);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [autoRefreshChecked, setautoRefreshChecked] = useState(false);

  useEffect(() => {
    // 로그인 되어있을 경우 접속 안되도록
    //Edited to visit each page wanted
    
    if (!accessToken) {
      moveToPage(route.home, () => {}, { replace: true });
    }
  }, [accessToken]);

  useEffect(() => {
    const savedUserId = localStorage.getItem("savedUserId");
    if (savedUserId) {
      setUserId(savedUserId);
      setautoRefreshChecked(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (!userId || !password) {
        return toast("값을 입력해주세요");
      }

       //temportary change
      localStorage.setItem("isLogined", "true");
        moveToPage(`${route.home}`, () => {}, { replace: true });
       //temportay 


      const loginData = { userId, password };

      const response = (await login(loginData)).data.data.accessToken;

      if (response) {
        setAccessToken(response);

        const response2 = (await myInfo()).data.data.content;
        setLoginInfo(response2);

        localStorage.setItem("isLogined", "true");

        moveToPage(`${route.home}?tab=basic`, () => {}, { replace: true });
      }

      if (autoRefreshChecked) {
        localStorage.setItem("savedUserId", userId);
      } else {
        localStorage.removeItem("savedUserId");
      }
    } catch (error: any) {
      if (error.data.code === 4001) {
        moveToPage(route.before_approve_account, () => {}, {
          replace: true,
        });
      }

      errorHandler(error as AxiosError);
    }
  };

  return {
    userId,
    setUserId,
    password,
    setPassword,
    autoRefreshChecked,
    setautoRefreshChecked,
    handleLogin,
  };
};

export default useLoginController;
