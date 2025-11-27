import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css";
import authApi from "./features/auth/api/auth.api";
import Router from "./routes/Router";
import LoadingSpinner from "./shared/components/templates/loading/LoadingSpinner";
import GlobalModal from "./shared/components/templates/modal/GlobalModal";
import useScrollToTop from "./shared/hooks/useScrollToTop";
import { accessTokenState } from "./shared/store/accessTokenState";
import { loginInfoState } from "./shared/store/loginInfoState";
import { logoutAlertModalState } from "./shared/store/logoutAlertModalState";
import LogoutAlertModal from "./shared/components/atoms/LogoutAlertModal";

// React Query
const queryClient = new QueryClient();

const App = () => {
  useScrollToTop();
  const [initialized, setInitialized] = useState(false);
  const { resetToken, myInfo } = authApi();

  const setAccessToken = useSetRecoilState(accessTokenState);
  const setLoginInfo = useSetRecoilState(loginInfoState);
  const setLogoutAlertModal = useSetRecoilState(logoutAlertModalState);
  const isLogoutAlertModal = useRecoilValue(logoutAlertModalState);

  const initializeApp = async () => {
    try {
      const response = await resetToken();

      const accessToken = response.data.data.accessToken;
      if (!accessToken) throw new Error("accessToken 없음");

      setAccessToken(accessToken);

      const userInfoResponse = await myInfo();
      const userInfo = userInfoResponse.data.data.content;
      if (!userInfo) throw new Error("userInfo 없음");

      setLoginInfo(userInfo);
    } catch {
      // 로그인 없이 구조만 볼 수 있도록 더미 데이터 설정
      setAccessToken("dummy-token");
      setLoginInfo({
        id: 0,
        account: "dummy",
        name: "더미 사용자",
        role: "ADMIN",
        activation: true,
        approval: true,
      });
      // 모달이 뜨지 않도록 명시적으로 false 설정
      setLogoutAlertModal(false);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    // 항상 초기화 시도 (로그인 체크 우회)
    initializeApp();
  }, []);

  if (!initialized) {
    return (
      <div className="App">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router />
        <GlobalModal />
        <ToastContainer
          className="toast"
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
        />
        {isLogoutAlertModal && <LogoutAlertModal />}
      </QueryClientProvider>
    </div>
  );
};

export default App;
