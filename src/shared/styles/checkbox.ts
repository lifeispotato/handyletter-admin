// 체크박스 기본 스타일
const CHECKBOX_BASE = `
  flex h-[20px] w-[20px] 
  items-center justify-center 
  rounded-[2px] border border-[#B8BFC4] 
  bg-white p-[1px] 
  pointer-events-none
  transition-all duration-200
`
  .replace(/\s+/g, " ")
  .trim();

// 체크박스 상태별 스타일
export const CHECKBOX_STYLES = {
  base: CHECKBOX_BASE,
  variants: {
    hover: "hover:border-[#27BEFF] hover:bg-[#F5FCFF]",
    checked: "!bg-[#27BEFF] !border-[#27BEFF]",
    indeterminate: "!bg-[#27BEFF] !border-[#27BEFF]",
    disabled: "!cursor-not-allowed !bg-[#B8BFC4] !border-[#B8BFC4]",
  },
  focus: "peer-focus-visible:ring-[#27BEFF] peer-focus-visible:ring-2",
};

// 체크박스 크기 변형
export const CHECKBOX_SIZES = {
  sm: "h-[16px] w-[16px]",
  md: "h-[20px] w-[20px]",
  lg: "h-[24px] w-[24px]",
};

// 체크박스 라벨 스타일
export const CHECKBOX_LABEL_STYLES = {
  base: "select-none",
  variants: {
    disabled: "cursor-not-allowed",
    enabled: "cursor-pointer hover:text-[#27BEFF]",
  },
};

// 체크박스 컨테이너 스타일
export const CHECKBOX_CONTAINER_STYLES = {
  base: "flex items-center gap-2 relative",
  variants: {
    enabled: "cursor-pointer",
  },
};
