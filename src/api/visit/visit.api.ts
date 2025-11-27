import api from "../api";
import type {
  GetVisitListQueryParams,
  GetVisitListResponse,
} from "./visit.types";

export default class VisitApi {
  static async getVisitList(queryParams: GetVisitListQueryParams) {
    return await api.get<GetVisitListResponse>("/visit", queryParams);
  }
}
