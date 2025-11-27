import api from "@/api/api";
import type {
  GetNoticeListQueryParams,
  GetNoticeListResponse,
  GetNoticeDetailResponse,
  PostNoticeRequest,
  PatchNoticeRequest,
  DeleteNoticeRequest,
} from "./notice.types";

export default class NoticeApi {
  // 공지사항 목록 조회
  static getNoticeList(queryParams: GetNoticeListQueryParams) {
    return api.get<GetNoticeListResponse>("/notice", queryParams);
  }

  // 공지사항 상세 조회
  static getNoticeDetail(id: number) {
    return api.get<GetNoticeDetailResponse>(`/notice/${id}`);
  }

  // 공지사항 생성
  static postNotice(request: PostNoticeRequest) {
    return api.post("/notice", request);
  }

  // 공지사항 수정
  static patchNotice(id: number, request: PatchNoticeRequest) {
    return api.patch(`/notice/${id}`, request);
  }

  // 공지사항 삭제
  static deleteNotice(request: DeleteNoticeRequest) {
    return api.del("/notice", request);
  }
}
