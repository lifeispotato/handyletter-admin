export const chartOptions = {
  responsive: true, // 차트 크기를 컨테이너에 맞게 자동 조정
  maintainAspectRatio: false, // 차트의 가로/세로 비율을 고정하지 않음
  plugins: {
    tooltip: {
      enabled: false, // 마우스 호버시 나타나는 툴팁 비활성화
    },
    legend: {
      display: false, // 범례 표시 비활성화
    },
    datalabels: {
      anchor: "end", // 데이터 라벨의 기준점을 막대의 끝으로 설정
      align: "top", // 데이터 라벨을 막대 위에 배치
      offset: 6, // 데이터 라벨과 막대 사이의 간격 (픽셀)
      color: "#636C73", // 데이터 라벨의 텍스트 색상
      font: {
        family: "Pretendard", // 폰트 패밀리
        weight: 600, // 폰트 굵기
        size: 12, // 폰트 크기
      },
      formatter: (value: number) => (value > 0 ? value.toString() : ""), // 0보다 큰 값만 표시
    },
  },
  scales: {
    x: {
      stacked: true, // X축 데이터 누적 활성화
      grid: { display: false }, // X축 그리드 라인 숨김
      border: { display: false }, // X축 경계선 숨김
      ticks: {
        color: "#636c73", // X축 눈금 텍스트 색상
        font: {
          family: "Pretendard",
          weight: 600,
          size: 14,
          lineHeight: 1.6,
        },
      },
    },
    y: {
      stacked: true, // Y축 데이터 누적 활성화
      beginAtZero: false, // Y축이 0에서 시작하지 않음
      // max: 100, // Y축 최대값
      border: { display: false }, // Y축 경계선 숨김
      grid: {
        color: "#D1D5D9", // Y축 그리드 라인 색상
        drawTicks: false, // 눈금 표시 숨김
        lineWidth: 0.5, // 그리드 라인 두께
      },
      ticks: {
        count: 4, // 원하는 눈금 갯수
        callback: (value: number) => Math.floor(value),
        padding: 17, // Y축 눈금과 라벨 사이의 간격
        color: "#b8bfc4", // Y축 눈금 텍스트 색상
        // stepSize: 20, // Y축 눈금 간격
        font: {
          family: "Pretendard",
          weight: 600,
          size: 12,
          lineHeight: 1.6,
        },
      },
    },
  },
  layout: {
    padding: {
      top: 33, // 차트 상단 여백
      bottom: 33, // 차트 하단 여백
    },
  },
};
