import { TooltipItem } from "chart.js";
import moment from "moment";
import { useEffect, useState } from "react";
// import { useFetch } from "../../../shared/hooks/useFetch"; // (API logic commented out)
import { formatNumberWithCommas } from "@/shared/utils/formatNum";
// import homeApi from "../api/home.api"; // (API logic commented out)
import { DailySalesType } from "../types/home.types";

// --- 1. MOCK DATA ---
// We create fake data here so you can see your chart
const MOCK_SALES_DATA: DailySalesType[] = [
  { date: "2025-10-01", totalAmount: 0 },
  { date: "2025-10-02", totalAmount: 5 },
  { date: "2025-10-03", totalAmount: 10 },
  { date: "2025-10-04", totalAmount: 15 },
  { date: "2025-10-05", totalAmount: 10 },
  { date: "2025-10-06", totalAmount: 15 },
  { date: "2025-10-07", totalAmount: 10 },
  { date: "2025-10-08", totalAmount: 15 },
  { date: "2025-10-09", totalAmount: 10 },
  { date: "2025-10-14", totalAmount: 15 },
];
// --------------------

const useHomeDailySalesChart = () => {
  // =========================================================================
  // 공통
  // =========================================================================
  // const { getDailySales } = homeApi(); // (API logic commented out)

  // =========================================================================
  // 데이터 패칭
  // =========================================================================
  const PAGE_SIZE = 10;
  // --- (These are now unused with mock data, but can be kept for later) ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // --------------------------------------------------------------------

  // --- 2. Use Mock Data ---
  // We set the sales data directly from our mock array
  const [salesData, setSalesData] = useState<DailySalesType[]>([]);

  // (This useEffect is for formatting the mock data)
  useEffect(() => {
    const formattedData = MOCK_SALES_DATA.map((item: DailySalesType) => ({
      date: moment(item.date).format("MM/DD"),
      totalAmount: item.totalAmount,
    }));
    setTotalCount(MOCK_SALES_DATA.length);
    setTotalPages(Math.ceil(MOCK_SALES_DATA.length / PAGE_SIZE));
    setSalesData(formattedData); // We don't reverse mock data
  }, []); // Run only once

  // --- (API Logic Commented Out) ---
  /*
  const getDailySalesFunc = async () => {
    try {
      const response = (
        await getDailySales({
          page: currentPage,
          size: PAGE_SIZE,
        })
      ).data.data;

      return response;
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const { data } = useFetch(getDailySalesFunc, [
    "getDailySalesFunc",
    currentPage,
  ]);

  useEffect(() => {
    if (data) {
      const formattedData = data.content.map((item: DailySalesType) => ({
        date: moment(item.date).format("MM/DD"),
        totalAmount: item.totalAmount,
      }));
      setTotalCount(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
      setSalesData(formattedData.reverse());
    } else {
      setSalesData([]);
    }
  }, [data]);
  */
  // --- (End of API Logic) ---

  // =========================================================================
  // 차트 설정
  // =========================================================================
  // This part is unchanged and will now use your mock data
  const labels = salesData.map((data) => data.date);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: salesData.map((data) => data.totalAmount),
        backgroundColor: labels.map((_, index) => {
          return index % 2 === 0 ? "#27BEFF" : "#AF894F";
        }),
        borderRadius: 50,
        barThickness: 23,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // 차트 비율 유지
    responsive: true,
    layout: {
      padding: {},
    },
    plugins: {
      datalabels: {
        display: true, // Make sure labels are visible
        anchor: "end" as const, // Anchors the label to the top of the bar
        align: "top" as const, // Aligns the text *above* the anchor point
        offset: 4, // Adds a 4px padding above the bar
        color: "#636c73", // Sets the label color (matches your x-axis)
        font: {
          family: "Pretendard",
          weight: "bold" as const,
        },
        // Formatter to show the number
        formatter: (value: number) => {
          return formatNumberWithCommas(value);
        },
      },
      legend: { display: false },
      tooltip: {
        displayColors: false, // 컬러 박스 제거
        callbacks: {
          label: (context: TooltipItem<"bar">) =>
            `${formatNumberWithCommas(context.raw as number)}`,
          title: () => "",
        },
        backgroundColor: "#262c31", // 툴팁 배경색
        bodyColor: "#fff", // Label 텍스트 색상
        bodyFont: {
          // Label 폰트 설정
          family: "Pretendard",
          weight: 700,
          size: 16,
          lineHeight: 1.4,
        },
        bodyAlign: "center" as const, // Label 정렬
        bodySpacing: -0.6, // Label 간격 조정
        padding: {
          // 툴팁 패딩
          top: 8,
          bottom: 8,
          left: 12,
          right: 12,
        },
      },
    },
    scales: {
      y: {
        // y축 0부터 시작하지 않음

        ticks: {
          stepSize: 5,
          padding: 17, // y축 레이블과 축 사이의 간격
          callback: (value: string | number): string =>
            `${Number(value).toLocaleString()}`,
          color: "#b8bfc4",
          font: {
            family: "Pretendard",
            weight: 600,
            size: 12,
            lineHeight: 1.6,
          },
        },
        grid: {
          color: "#D1D5D9",
          drawTicks: false, // 눈금선 제거
          lineWidth: 0.5, // 눈금선 두께
        },
        border: {
          display: false, // y축 테두리 제거
        },
      },
      x: {
        ticks: {
          color: "#636c73",
          font: {
            family: "Pretendard",
            weight: 600,
            size: 14,
            lineHeight: 1.6,
          },
        },
        grid: { display: false },
        border: {
          display: false, // x축 테두리 제거
        },
      },
    },
  };

  return {
    chartData,
    chartOptions,
    currentPage,
    setCurrentPage,
    totalCount,
    totalPages,
  };
};

export default useHomeDailySalesChart;
