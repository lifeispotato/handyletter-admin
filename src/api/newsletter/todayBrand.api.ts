import api from "@/api/api";
import type {
  GetTodayBrandListQueryParams,
  GetTodayBrandListResponse,
  GetTodayBrandDetailResponse,
  PostTodayBrandRequest,
  PatchTodayBrandRequest,
  DeleteTodayBrandRequest,
  ToggleHiddenRequest,
} from "./todayBrand.types";

export default class TodayBrandApi {
  // 오늘의 브랜드 목록 조회
  static getTodayBrandList(queryParams: GetTodayBrandListQueryParams) {
    return api.get<GetTodayBrandListResponse>(
      "/newsletter/today-brand",
      queryParams
    );
  }

  // 오늘의 브랜드 상세 조회
  static getTodayBrandDetail(id: number) {
    return api.get<GetTodayBrandDetailResponse>(
      `/newsletter/today-brand/${id}`
    );
  }

  // 오늘의 브랜드 생성
  static postTodayBrand(request: PostTodayBrandRequest) {
    return api.post("/newsletter/today-brand", request);
  }

  // 오늘의 브랜드 수정
  static patchTodayBrand(id: number, request: PatchTodayBrandRequest) {
    return api.patch(`/newsletter/today-brand/${id}`, request);
  }

  // 오늘의 브랜드 삭제
  static deleteTodayBrand(request: DeleteTodayBrandRequest) {
    return api.del("/newsletter/today-brand", request);
  }

  // 숨김/숨김해제 토글
  static toggleHidden(request: ToggleHiddenRequest) {
    return api.patch(`/newsletter/today-brand/${request.id}/hidden`, {
      isHidden: request.isHidden,
    });
  }
}
