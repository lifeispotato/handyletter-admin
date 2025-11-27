import api from "../api";
import type {
  GetBasicDetailResponse,
  PatchBasicRequest,
  PatchBasicResponse,
} from "./basic.types";

export default class BasicApi {
  // 기본정보 상세 조회
  static async getBasicDetail() {
    return await api.get<GetBasicDetailResponse>(`/basic`);
  }

  // 기본정보 수정
  static async patchBasic(request: PatchBasicRequest) {
    return await api.patch<PatchBasicResponse>(`/basic`, request);
  }
}
