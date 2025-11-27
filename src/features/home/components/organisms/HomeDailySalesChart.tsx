import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DetailBox from "../../../../shared/components/atoms/layout/detailPage/DetailBox";

import IconButton from "../../../../shared/components/molecules/button/IconButton";
import useHomeDailySalesChart from "../../hooks/useHomeDailySalesChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HomeDailySalesChart = () => {
  const { chartData, chartOptions, setCurrentPage, currentPage, totalPages } =
    useHomeDailySalesChart();

  return (
    <DetailBox className="w-[1044px] p-[20px] flex items-center justify-between">
      <IconButton
        imgSrc="/assets/admin/icons/ic_arrow_gray_up.png"
        className="w-[28px] h-[28px] rotate-270"
        alt="이전으로 이동"
        onClick={() => {
          if (currentPage >= 1) {
            setCurrentPage(currentPage + 1);
          }
        }}
        disabled={currentPage >= totalPages}
      />
      <div className="w-[891px] h-[233px]">
        <Bar options={chartOptions} data={chartData} />
      </div>
      <IconButton
        imgSrc="/assets/admin/icons/ic_arrow_gray_up.png"
        className="w-[28px] h-[28px] rotate-90"
        alt="다음으로 이동"
        onClick={() => {
          if (currentPage <= totalPages) {
            setCurrentPage(currentPage - 1);
          }
        }}
        disabled={currentPage <= 1}
      />
    </DetailBox>
  );
};

export default HomeDailySalesChart;
