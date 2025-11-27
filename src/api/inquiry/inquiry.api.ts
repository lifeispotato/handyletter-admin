import api from "@/api/api";
import type {
  GetInquiryListQueryParams,
  GetInquiryListResponse,
  GetInquiryDetailResponse,
  PostInquiryRequest,
  PatchInquiryRequest,
  DeleteInquiryRequest,
} from "./inquiry.types";

export default class InquiryApi {
  // Inquiry 목록 조회
  static getInquiryList(queryParams: GetInquiryListQueryParams) {
    return api.get<GetInquiryListResponse>("/inquiry", queryParams);
  }

  // Inquiry 상세 조회
  static getInquiryDetail(id: number) {
    return api.get<GetInquiryDetailResponse>(`/inquiry/${id}`);
  }

  // Inquiry 생성
  static postInquiry(request: PostInquiryRequest) {
    return api.post("/inquiry", request);
  }

  // Inquiry 수정
  static patchInquiry(id: number, request: PatchInquiryRequest) {
    return api.patch(`/inquiry/${id}`, request);
  }

  // Inquiry 삭제
  static deleteInquiry(request: DeleteInquiryRequest) {
    return api.del("/inquiry", request);
  }
}
