// 인풋 필드 스타일
const INPUT_BASE = `
  w-[338px] h-[48px]
  px-[15px] py-[13px]
  font-pretendard text-[15px] text-system-700
  placeholder-system-500
  border border-system-400 rounded-[4px]
  transition-colors duration-200
  focus:outline-none focus:border-primary focus:text-system-700
  disabled:bg-system-500/20 disabled:border-system-400 
  disabled:text-system-500 disabled:placeholder-system-500
  not-placeholder-shown:text-system-700
`
  .replace(/\s+/g, " ")
  .trim();

export const INPUT_BASE_VARIANT = {
  default: `
    ${INPUT_BASE}
  `,
  error: `
    ${INPUT_BASE}
    border-error focus:border-error
  `,
};
export const DATE_BASE_VARIANT = {
  default:
    "border-system-400 focus:border-primary focus:text-system-700 hover:border-system-500 relative h-[48px] w-full rounded-[4px] border text-left transition-all duration-200 focus:outline-none",
};

// FormInput 스타일 (단순화)
export const FORM_INPUT_STYLES = {
  base: `${INPUT_BASE} h-[52px] p-[12px_16px] w-full rounded-[8px]`,
  variants: {
    error: "border-error focus:border-error",
    disabled: "disabled:bg-system-100 disabled:border-system-400",
    dark: "bg-system-900 text-white",
    "dark-disabled": "disabled:bg-system-700 disabled:border-system-600",
  },
};

export const SEARCH_INPUT_BASE = `
  w-[340px] h-[42px]
  px-[20px] py-[10px]
  font-pretendard text-[16px] text-system-700
  bg-system-100
  placeholder-system-400
  border border-system-100 rounded-[20px]
  transition-colors duration-200
  focus:outline-none focus:bg-system-100 focus:text-system-700 focus:border-system-100
  focus:placeholder-system-700
  hover:shadow-sm
`;
