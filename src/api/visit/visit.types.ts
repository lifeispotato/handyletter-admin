export interface GetVisitListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
}

export interface GetVisitListResponse {
  data: {
    content: [
      {
        id: number;
        createdAt: string;
        updatedAt: string;
        today: string;
        count: number;
      },
    ];
    totalCount: number;
  };
}
