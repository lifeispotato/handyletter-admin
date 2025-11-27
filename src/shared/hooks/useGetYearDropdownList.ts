import { useMemo } from "react";

const useGetYearDropdownList = (isYYYY?: boolean) => {
  const baseYear = 2025;
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const yearDropdownList = Array.from(
    { length: currentYear - baseYear + 1 },
    (_, i) => {
      const year = baseYear + i;
      return {
        title: `${year.toString().slice(isYYYY ? 0 : 2)}년`,
        value: year.toString(),
      };
    }
  );

  return {
    yearDropdownList,
  };
};

export default useGetYearDropdownList;
