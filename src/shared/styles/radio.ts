const RADIO_BASE = `
  w-[20px] h-[20px]
  border-1 border-none rounded-full
  transition-colors duration-200
  focus:outline-none focus:border-primary focus:text-system-700
  disabled:bg-system-500/20 disabled:border-system-400 
  disabled:text-system-500 disabled:placeholder-system-500
  not-placeholder-shown:text-system-700
`
  .replace(/\s+/g, " ")
  .trim();

export const RADIO_BASE_VARIANT = {
  default: `
    ${RADIO_BASE}
  `,
  variants: {
    hover: "hover:border-primary",
    checked: "checked:border-primary",
    disabled: "disabled:border-system-400",
    focus: "focus:border-primary",
  },
};

// 라디오 상태별 스타일
export const RADIO_STYLES = {
  base: {
    container:
      "flex h-full w-full items-center justify-center rounded-full border-2 border-[#B8BFC4] bg-white",
    dot: "h-[8px] w-[8px] rounded-full bg-[#B8BFC4]",
  },
  variants: {
    hover: "hover:border-[#27BEFF] hover:bg-[#F5FCFF]",
    checked: {
      container:
        "flex h-full w-full items-center justify-center rounded-full border-2 border-[#27BEFF] bg-white",
      dot: "h-[8px] w-[8px] rounded-full bg-[#27BEFF]",
    },
    disabled: "!cursor-not-allowed !bg-[#B8BFC4] !border-[#B8BFC4]",
  },
  focus: "peer-focus-visible:ring-[#27BEFF] peer-focus-visible:ring-2",
};

// 라디오 크기 변형
export const RADIO_SIZES = {
  sm: "h-[16px] w-[16px]",
  md: "h-[20px] w-[20px]",
  lg: "h-[24px] w-[24px]",
};

// 라디오 라벨 스타일
export const RADIO_LABEL_STYLES = {
  base: "select-none font-pretendard",
  variants: {
    disabled: "cursor-not-allowed",
    enabled: "cursor-pointer hover:text-[#27BEFF]",
  },
};

// 라디오 컨테이너 스타일
export const RADIO_CONTAINER_STYLES = {
  base: "flex items-center gap-2 relative",
  variants: {
    enabled: "cursor-pointer",
  },
};
