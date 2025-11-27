import { useLocation } from "react-router-dom";
import { route } from "../../../routes/route";
import useAuth from "../../../shared/hooks/useAuth";
import useMoveToPage from "../../../shared/hooks/useMoveToPage";

const useJoinController = () => {
  // =========================================================================
  // 공통
  // =========================================================================
  const { moveToPage } = useMoveToPage();

  // =========================================================================
  // 본인인증
  // =========================================================================
  const location = useLocation();
  const authData = location.state?.authData;

  // 본인인증 훅 사용
  useAuth({
    onAuthSuccess: (data) => {
      moveToPage(route.account_find, () => {}, {
        state: {
          authData: data,
        },
      });
    },
  });

  return {
    authData,
  };
};

export default useJoinController;
