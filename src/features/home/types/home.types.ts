export interface DailyVisitCountType {
  id: number;
  date: string;
  todayCount: number;
  totalCount: number;
  visitDate: Date;
  createdAt: string;
  updatedAt: string;
}

export interface DailySalesType {
  date: string;
  totalAmount: number;
}
