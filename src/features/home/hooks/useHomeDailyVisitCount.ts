import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useFetch } from "../../../shared/hooks/useFetch";
import { errorHandler } from "../../../shared/utils/errorHandler";
import homeApi from "../api/home.api";

const useHomeDailyVisitCount = () => {
  // =========================================================================
  // 공통
  // =========================================================================
  const { getDailyVisitCount } = homeApi();
  const [visitDate, setVisitDate] = useState(new Date());

  // =========================================================================
  // 데이터 패칭
  // =========================================================================
  const [visitCount, setVisitCount] = useState<number>(0);

  const getDailyVisitCountFunc = async () => {
    try {
      const response = (
        await getDailyVisitCount({
          visitDate: visitDate.toISOString(),
        })
      ).data.data.content;

      return response;
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const { data } = useFetch(getDailyVisitCountFunc, [
    "getDailyVisitCountFunc",
    visitDate,
  ]);

  useEffect(() => {
    if (data && data.length > 0) {
      setVisitCount(data[0].todayCount);
    } else {
      setVisitCount(0);
    }
  }, [data]);

  return { visitCount, visitDate, setVisitDate };
};

export default useHomeDailyVisitCount;
