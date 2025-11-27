import api from "../api";
import type {
  DeleteNotificationRequest,
  GetNotificationDetailResponse,
  GetNotificationListQueryParams,
  GetNotificationListResponse,
  PatchNotificationRequest,
  PatchNotificationResponse,
  PostNotificationRequest,
  PostNotificationResponse,
} from "./notification.types";

export default class NotificationApi {
  // 알림 목록 조회
  static async getNotificationList(
    queryParams: GetNotificationListQueryParams
  ) {
    return await api.get<GetNotificationListResponse>(
      "/notification",
      queryParams
    );
  }

  // 알림 상세 조회
  static async getNotificationDetail(id: number) {
    return await api.get<GetNotificationDetailResponse>(`/notification/${id}`);
  }

  // 알림 생성
  static async postNotification(request: PostNotificationRequest) {
    return await api.post<PostNotificationResponse>("/notification", request);
  }

  // 알림 수정
  static async patchNotification(
    id: number,
    request: PatchNotificationRequest
  ) {
    return await api.patch<PatchNotificationResponse>(
      `/notification/${id}`,
      request
    );
  }

  // 알림 삭제
  static async deleteNotification(request: DeleteNotificationRequest) {
    return await api.del<DeleteNotificationRequest>(`/notification`, request);
  }
}
