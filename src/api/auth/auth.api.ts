import api from "../api";
import type {
  LoginRequest,
  LoginResponse,
  ResetTokenResponse,
  SignupRequest,
  SignupResponse,
} from "./auth.types";

export default class AuthApi {
  static async resetToken() {
    return await api.post<ResetTokenResponse>("/auth/reset/token/manager"); // accessToken 재발급(관리자)
  }

  static async login(request: LoginRequest) {
    return await api.post<LoginResponse>("/auth/login/manager", request); // 로그인(관리자)
  }

  static async logout() {
    return await api.post("/auth/logout/manager"); // 로그아웃(관리자)
  }

  static async signup(request: SignupRequest) {
    return await api.post<SignupResponse>("/auth/sign/manager", request); // 회원가입(관리자)
  }
}
