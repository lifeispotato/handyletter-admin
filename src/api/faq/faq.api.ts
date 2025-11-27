import api from "@/api/api";
import type {
  GetFaqListQueryParams,
  GetFaqListResponse,
  GetFaqDetailResponse,
  PostFaqRequest,
  PatchFaqRequest,
  DeleteFaqRequest,
} from "./faq.types";

export default class FaqApi {
  // FAQ 목록 조회
  static getFaqList(queryParams: GetFaqListQueryParams) {
    return api.get<GetFaqListResponse>("/faq", queryParams);
  }

  // FAQ 상세 조회
  static getFaqDetail(id: number) {
    return api.get<GetFaqDetailResponse>(`/faq/${id}`);
  }

  // FAQ 생성
  static postFaq(request: PostFaqRequest) {
    return api.post("/faq", request);
  }

  // FAQ 수정
  static patchFaq(id: number, request: PatchFaqRequest) {
    return api.patch(`/faq/${id}`, request);
  }

  // FAQ 삭제
  static deleteFaq(request: DeleteFaqRequest) {
    return api.del("/faq", request);
  }
}
