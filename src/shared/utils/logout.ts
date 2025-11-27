// === 공통 로그아웃 처리 함수
import { setRecoil } from "recoil-nexus";
import authApi from "../../features/auth/api/auth.api";
import { accessTokenState } from "../store/accessTokenState";
import { loginInfoState } from "../store/loginInfoState";
import { logoutAlertModalState } from "../store/logoutAlertModalState";

export async function handleLogout() {
  const { logout } = authApi();

  setRecoil(accessTokenState, null);
  setRecoil(logoutAlertModalState, false);
  setRecoil(loginInfoState, null);

  await Promise.resolve(sessionStorage.clear());
  await Promise.resolve(localStorage.removeItem("isLogined"));

  await logout();

  window.location.href = "/login";
}
