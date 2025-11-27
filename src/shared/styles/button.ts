// 버튼 스타일
const BUTTON_PRIMARY_BASE = `
  w-[338px] h-[48px]
  flex flex-row items-center justify-center
  rounded-[3px]
  font-[Pretendard] font-medium text-[15px] text-center text-white
  bg-primary
  hover:bg-primary-focused
  cursor-pointer
  disabled:bg-primary-disabled disabled:border-primary-disabled
  transition-all
  duration-300
  ease-in-out
`
  .replace(/\s+/g, " ")
  .trim();

const BUTTON_SECONDARY_BASE = `
  w-[338px] h-[48px]
  flex flex-row items-center justify-center
  rounded-[3px]
  font-[Pretendard] font-medium text-[15px] text-center text-system-500
  bg-secondary hover:bg-secondary-focused
  border border-system-400
  cursor-pointer
  disabled:bg-secondary-disabled disabled:border-system-400 disabled:text-system-500
  transition-all
  duration-300
  ease-in-out
`
  .replace(/\s+/g, " ")
  .trim();

export const BUTTON_PRIMARY_BASE_VARIANT = {
  primary: `${BUTTON_PRIMARY_BASE} `,
};

export const BUTTON_SECONDARY_BASE_VARIANT = {
  secondary: `${BUTTON_SECONDARY_BASE} `,
};

export const BUTTON_LOGOUT_VARIANT = {
  default: `
    ${BUTTON_PRIMARY_BASE}
    w-[88px] h-[41px]
    bg-system-100
    text-system-600
    border border-system-100
    hover:bg-system-300
    hover:text-system-600
    hover:border-system-300
    rounded-[22px]
  `,
};

export const PAGINATION_ARROW_BUTTON_VARIANT = {
  default: `
    w-[28px] h-[28px]
    flex flex-row items-center justify-center
    px-[6px] py-[6px]
    rounded-[8px]
    border border-system-200
    bg-white
    hover:bg-system-100
    cursor-pointer
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:bg-white
  `,
};

const PAGINATION_PAGE_BUTTON_BASE = `
  w-[28px] h-[28px]
  flex flex-row items-center justify-center
  px-[6px] py-[6px]
  rounded-[8px]
  border-none
  bg-white
  font-[Pretendard] font-semibold text-[16px] text-center
  leading-trim: NONE;
  line-height: 26px;
  letter-spacing: -0.3%;
  text-align: center;
  cursor-pointer
`
  .replace(/\s+/g, " ")
  .trim();

export const PAGINATION_PAGE_BUTTON_VARIANT = {
  default: `
    ${PAGINATION_PAGE_BUTTON_BASE}
    text-system-500
    bg-white
    hover:bg-system-100
    hover:text-system-700
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:bg-white
    disabled:hover:text-system-500
  `,
  selected: `
    ${PAGINATION_PAGE_BUTTON_BASE}
    text-system-700
    bg-system-100
    hover:bg-system-100
    hover:text-system-700
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
};

export const DROPDOWN_BASE_VARIANT = {
  default: `
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
  `,
};

export const BUTTON_DELETE_VARIANT = {
  selected_delete: `
    ${BUTTON_PRIMARY_BASE}
    w-fit h-fit
    px-4 py-2
    bg-white
    border border-system-500
    text-system-600
    rounded-[23px]
    hover:bg-system-300
    hover:text-system-600
    hover:border-system-500
  `,
  delete: `
    ${BUTTON_PRIMARY_BASE}
    w-[68px] h-[42px]
    bg-white
    border border-system-500
    text-system-600
    rounded-[23px]
    hover:bg-system-300
    hover:text-system-600
    hover:border-system-500
  `,
};

export const BUTTON_CONFIRM_BASE = `
  w-[68px] h-[42px]
  font-pretendard text-[15px] text-system-600
  rounded-[100px]
  transition-all
  duration-300
  ease-in-out
  cursor-pointer
`;

export const BUTTON_CONFIRM_VARIANT = {
  cancel: `
    ${BUTTON_CONFIRM_BASE}
    text-[#636c73]
    bg-[#F2F4F5]
    hover:bg-[#E8EAED]
  `,
  delete: `
    ${BUTTON_CONFIRM_BASE}
    text-white
    bg-[#ff003d]
    hover:bg-[#e6003a]
  `,
  update: `
    ${BUTTON_CONFIRM_BASE}
    text-white
    bg-[#279EFF]
    hover:bg-[#1E8BE6]
  `,
};
export const BUTTON_UPDATE_VARIANT = {
  create: `
    ${BUTTON_PRIMARY_BASE}
    w-[68px] h-[42px]
    bg-system-700
    border border-system-700
    text-white
    rounded-[23px]
    hover:bg-system-700/50
    hover:border-system-700/50
    hover:text-white
  `,
  update: `
    ${BUTTON_PRIMARY_BASE}
    w-[68px] h-[42px]
    bg-system-700
    border border-system-700
    text-white
    rounded-[23px]
    hover:bg-system-700/50
    hover:border-system-700/50
    hover:text-white
  `,
  approve: `
    ${BUTTON_PRIMARY_BASE}
    w-[68px] h-[42px]
    bg-white
    border border-[#EF594B]
    text-[#EF594B]
    rounded-[23px]
    hover:bg-[#EF594B]/10
    hover:text-[#EF594B]
    hover:border-[#EF594B]
  `,
};

export const BUTTON_CANCEL_VARIANT = {
  default: `
    w-[28px] h-[28px]
    flex flex-row items-center justify-center
    px-[6px] py-[6px]
    rounded-[8px]
    border border-system-200
    text-system-500
    bg-white
    hover:bg-system-100
    hover:text-system-700
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:bg-white
    disabled:hover:text-system-500
  `,
};

export const BUTTON_EXCEL_VARIANT = {
  default: `
    ${BUTTON_PRIMARY_BASE}
    w-[171px] h-[42px]
    bg-system-700
    text-white
    rounded-[23px]
    hover:bg-system-700/50
    hover:text-white
  `,
  square: `
    ${BUTTON_PRIMARY_BASE}
    w-[171px] h-[42px]
    bg-system-700
    text-white
    rounded-[4px]
    hover:bg-system-700/50
    hover:text-white
  `,
};

export const BUTTON_DETAIL_VARIANT = {
  default: `
    ${BUTTON_PRIMARY_BASE}
    w-[57px] h-[29px]
    bg-[#5A636A]
    text-white
    rounded-[4px]
    hover:bg-[#5A636A]/50
    hover:text-white
    font-pretendard text-[12px] leading-[18px] font-medium
  `,
  large: `
    ${BUTTON_PRIMARY_BASE}
   w-[171px] h-[42px]
    bg-[#5A636A]
    text-white
    rounded-[4px]
    hover:bg-[#5A636A]/50
    hover:text-white
    font-pretendard text-[12px] leading-[18px] font-medium
  `,
};

export const BUTTON_SAVE_VARIANT = {
  default: `
    ${BUTTON_PRIMARY_BASE}
    w-[92px] h-[49px]
    bg-[#636C73]
    text-white
    rounded-[4px]
    hover:bg-[#636C73]/50
    hover:text-white
  `,
};

// NEW STYLE for the "Reset" button (Blue Outline)
export const BUTTON_OUTLINE_PRIMARY_VARIANT = {
  default: `
    ${BUTTON_SECONDARY_BASE}
    border-primary text-primary
    hover:bg-primary/10
  `,
};

// NEW STYLE for the "Select Delete" button (Correct Disabled State)
export const BUTTON_SELECT_DELETE_VARIANT = {
  default: `
    ${BUTTON_PRIMARY_BASE}
    w-[127px] h-[42px]
    bg-white
    border border-system-500
    text-system-600
    rounded-[23px]
    hover:bg-system-300
    hover:text-system-600
    hover:border-system-500
    disabled:bg-white disabled:border-system-500 disabled:text-system-600
  `,
};

// --- Base style for small modal action buttons (신고, 삭제) ---
const BUTTON_MODAL_ACTION_BASE = `
 w-auto px-4 py-1
 font-pretendard text-[12px] font-medium
 rounded-[4px]
 transition-colors duration-200
 cursor-pointer
`
  .replace(/\s+/g, " ")
  .trim();

// --- Variant for "신고" (Report) button from Figma ---
export const BUTTON_GRAY_VARIANT = {
  default: `
  ${BUTTON_MODAL_ACTION_BASE}
  bg-gray-100
  text-gray-700
  hover:bg-gray-200
 `,
  hover: `
  ${BUTTON_MODAL_ACTION_BASE}
  bg-gray-200
  text-gray-700
 `,
};

// --- Variant for "삭제" (Delete) button from Figma ---
export const BUTTON_RED_VARIANT = {
  default: `
  ${BUTTON_MODAL_ACTION_BASE}
  bg-white
    px-3 rounded-full py-2 
  text-red-600
  hover:bg-red-100
border-1
  hover:text-red-700
 `,
  hover: `
  ${BUTTON_MODAL_ACTION_BASE}
  bg-red-100
  text-red-700
 `,
};
