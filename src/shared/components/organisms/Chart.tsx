import { Bar } from "react-chartjs-2";
import ArrowButton from "../molecules/button/ArrowButton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { PAGINATION_ARROW_BUTTON_VARIANT } from "../../styles/button";
import type { ChartProps } from "../../types/chartTypes";

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Chart = ({
  chartData,
  chartOptions,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: ChartProps) => {
  return (
    <div className="">
      <div className="flex items-center justify-between rounded-lg border-1 border-[#e6e8eb] bg-white p-6">
        {/* 페이지네이션 버튼들 */}
        <ArrowButton
          direction="prev"
          onClick={onPrevPage}
          isDisabled={currentPage === 1}
          className={PAGINATION_ARROW_BUTTON_VARIANT.default}
        />
        {/* 차트 영역 */}
        <div className="h-[298px] w-[878px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <ArrowButton
          direction="next"
          onClick={onNextPage}
          isDisabled={currentPage === totalPages}
          className={PAGINATION_ARROW_BUTTON_VARIANT.default}
        />
      </div>
    </div>
  );
};

export default Chart;
