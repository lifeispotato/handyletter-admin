import api from "@/api/api";
import type {
  GetDormListQueryParams,
  GetDormListResponse,
  GetDormDetailResponse,
  PostDormRequest,
  PatchDormRequest,
  DeleteDormRequest,
} from "./dorm.types";

export default class DormApi {
  // 숙소 목록 조회
  static getDormList(queryParams: GetDormListQueryParams) {
    return api.get<GetDormListResponse>("/dorm", queryParams);
  }

  // 숙소 상세 조회
  static getDormDetail(id: number) {
    return api.get<GetDormDetailResponse>(`/dorm/${id}`);
  }

  // 숙소 생성
  static postDorm(request: PostDormRequest) {
    return api.post("/dorm", request);
  }

  // 숙소 수정
  static patchDorm(id: number, request: PatchDormRequest) {
    return api.patch(`/dorm/${id}`, request);
  }

  // 숙소 삭제
  static deleteDorm(request: DeleteDormRequest) {
    return api.del("/dorm", request);
  }
}

