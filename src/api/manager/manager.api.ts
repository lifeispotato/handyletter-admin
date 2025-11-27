import api from "../api";
import type {
  GetManagerDetailResponse,
  GetManagerListQueryParams,
  GetManagerListResponse,
  DeleteManagerRequest,
  PatchManagerActivationRequest,
  PatchManagerActivationResponse,
  PatchManagerRequest,
  PatchManagerResponse,
  PostManagerCheckAccountRequest,
  PostManagerCheckAccountResponse,
  PatchManagerApprovalResponse,
  GetManagerMyInfoResponse,
} from "./manager.types";

export default class ManagerApi {
  // 관리자 목록 조회
  static async getManagerList(queryParams: GetManagerListQueryParams) {
    return await api.get<GetManagerListResponse>("/manager", queryParams);
  }

  // 관리자 상세 조회
  static async getManagerDetail(id: number) {
    return await api.get<GetManagerDetailResponse>(`/manager/${id}`);
  }

  // 관리자 내 정보 조회
  static async getManagerMyInfo() {
    return await api.get<GetManagerMyInfoResponse>("/manager/my-info");
  }

  // 관리자 삭제
  static async deleteManager(request: DeleteManagerRequest) {
    return await api.del<PatchManagerActivationResponse>(`/manager`, request);
  }

  // 관리자 아이디 중복 체크
  static async postManagerCheckAccount(
    request: PostManagerCheckAccountRequest
  ) {
    return await api.post<PostManagerCheckAccountResponse>(
      `/manager/check/account`,
      request
    );
  }

  // 관리자 정보 수정
  static async patchManager(id: number, request: PatchManagerRequest) {
    return await api.patch<PatchManagerResponse>(`/manager/${id}`, request);
  }

  // 관리자 활성/비활성
  static async patchManagerActivation(
    id: number,
    request: PatchManagerActivationRequest
  ) {
    return await api.patch<PatchManagerActivationResponse>(
      `/manager/${id}/activation`,
      request
    );
  }

  // 관리자 승인
  static async patchManagerApproval(id: number) {
    return await api.patch<PatchManagerApprovalResponse>(
      `/manager/${id}/approval`
    );
  }
}
