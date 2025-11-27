// 초를 ms로 변환
export const secToMs = (sec: number) => {
  return sec * 1000;
};

// 분을 ms로 변환
export const minToMs = (min: number) => {
  return min * 60 * 1000;
};

// ms를 분, 시로 변환
export const formatMsToHoursAndMinutes = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedMinutes = minutes % 60;
  const formattedHours = hours;

  return {
    hours: formattedHours,
    minutes: formattedMinutes,
  };
};
