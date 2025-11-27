import api from "../api";
import type {
  GetHomeCountResponse,
  GetMemberDetailResponse,
  GetMemberListQueryParams,
  GetMemberListResponse,
  DeleteMemberRequest,
  PatchMemberRequest,
} from "./member.types";

export default class MemberApi {
  // 회원 목록 조회
  static async getMemberList(queryParams: GetMemberListQueryParams) {
    return await api.get<GetMemberListResponse>("/member", queryParams);
  }

  // 회원 상세 조회
  static async getMemberDetail(id: number) {
    return await api.get<GetMemberDetailResponse>(`/member/${id}`);
  }

  // 홈 화면 통계 조회
  static async getHomeCount() {
    return await api.get<GetHomeCountResponse>("/member/home/count");
  }

  // 회원 수정
  static async patchMember(id: number, request: PatchMemberRequest) {
    return await api.patch<PatchMemberRequest>(`/member/edit/${id}`, request);
  }

  // 회원 삭제
  static async deleteMember(request: DeleteMemberRequest) {
    return await api.del<DeleteMemberRequest>("/member", request);
  }
}
