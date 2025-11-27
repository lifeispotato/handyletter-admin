import api from "@/api/api";
import type {
  GetTermsListQueryParams,
  GetTermsListResponse,
  GetTermsDetailResponse,
  PostTermsRequest,
  PatchTermsRequest,
  DeleteTermsRequest,
} from "./terms.types";

export default class TermsApi {
  // 약관 목록 조회
  static getTermsList(queryParams: GetTermsListQueryParams) {
    return api.get<GetTermsListResponse>("/terms", queryParams);
  }

  // 약관 상세 조회
  static getTermsDetail(id: number) {
    return api.get<GetTermsDetailResponse>(`/terms/${id}`);
  }

  // 약관 생성
  static postTerms(request: PostTermsRequest) {
    return api.post("/terms", request);
  }

  // 약관 수정
  static patchTerms(id: number, request: PatchTermsRequest) {
    return api.patch(`/terms/${id}`, request);
  }

  // 약관 삭제
  static deleteTerms(request: DeleteTermsRequest) {
    return api.del("/terms", request);
  }
}
