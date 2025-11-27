import { api } from "../../../shared/api/api";
import {
  GetListApiResponseType,
  GetListRequestType,
} from "../../../shared/types/api.types";
import { DailySalesType, DailyVisitCountType } from "../types/home.types";

const homeApi = () => {
  const { get } = api();

  //일일 매출
  const getDailySales = async (
    params: GetListRequestType
  ): Promise<GetListApiResponseType<DailySalesType>> => {
    return await get("/v1/analytics/daily-sales-statistics", params);
  };

  // 일일 방문자
  const getDailyVisitCount = async (
    params: GetListRequestType & { visitDate: string }
  ): Promise<GetListApiResponseType<DailyVisitCountType>> => {
    return await get("/v1/visit", params);
  };

  return { getDailyVisitCount, getDailySales };
};

export default homeApi;
