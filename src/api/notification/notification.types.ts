// 알림 데이터
export interface NotificationData {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  adminEmail: string;
  notificationType: "SERVICE" | "ADVERTISEMENT";
}

export interface GetNotificationListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  notificationType?: "SERVICE" | "ADVERTISEMENT";
  keyword?: string;
  searchField?: string;
}

export interface GetNotificationListResponse {
  data: {
    content: NotificationData[];
    totalCount: number;
  };
}

export interface GetNotificationDetailResponse {
  data: {
    content: NotificationData;
  };
}

export interface PostNotificationRequest {
  title: string;
  content: string;
  notificationType: "SERVICE" | "ADVERTISEMENT";
}

export interface PatchNotificationRequest {
  title: string;
  content: string;
  notificationType: "SERVICE" | "ADVERTISEMENT";
}

export interface PatchNotificationResponse {
  data: {
    content: {
      id: number;
    };
  };
}

export interface PostNotificationResponse {
  data: {
    content: {
      id: number;
    };
  };
}

export interface DeleteNotificationRequest {
  ids: number[];
}
