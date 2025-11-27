// 공통 textarea 스타일 (크기 제외)
const TEXTAREA_CORE = `
  font-pretendard text-[15px] font-normal
  leading-[21.25px] 
  rounded-[4px] border
  placeholder-system-500 text-system-700
  focus:outline-none transition-colors duration-200
  resize-none
`
  .replace(/\s+/g, " ")
  .trim();

// Textarea 스타일 (단순화)
export const TEXTAREA_STYLES = {
  base: `${TEXTAREA_CORE} w-[730px] p-[13px_15px] border-system-400 bg-white text-system-700 placeholder:text-system-500 focus:border-primary`,
  variants: {
    error: "border-error focus:border-error",
    disabled:
      "disabled:bg-system-100 disabled:border-system-400 disabled:text-system-500",
    dark: "border-system-800 bg-system-900 text-white placeholder:text-system-500",
    "dark-disabled":
      "disabled:bg-system-700 disabled:border-system-600 disabled:text-system-500",
    "height-normal": "max-h-[192px]",
    "height-infinity": "max-h-[unset]",
    labelValue:
      "border-none resize-none !p-[0px] font-pretendard text-[15px] leading-[24.5px] tracking-[-0.3px] text-[#5A636A] !font-weight-400 !line-height-[21.25px] !tracking-[0%]",
  },
};
