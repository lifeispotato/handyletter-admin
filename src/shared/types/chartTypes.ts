export interface ChartProps {
  chartData: any;
  chartOptions: any;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}
