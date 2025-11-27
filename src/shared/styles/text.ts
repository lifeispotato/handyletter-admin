const TEXT_BASE = `
  font-pretendard font-semibold
  text-system-500
`
  .replace(/\s+/g, " ")
  .trim();

export const TEXT_BASE_VARIANT = {
  default: `${TEXT_BASE}
  `,
  label: `${TEXT_BASE} text-[16px] leading-[26px] tracking-[-0.3%]
  `,
  helper: `${TEXT_BASE} text-[14px] leading-[22.75px] tracking-[-0.3%] font-medium
  `,
  title: `${TEXT_BASE}
  `,
  alt: `${TEXT_BASE}
  `,
  body: `${TEXT_BASE} text-[18px] leading-[32.5px] tracking-[-0.3%] font-normal
  `,
};

export const TEXT_LABEL_VALUE = `
  font-pretendard text-[15px] leading-[24.5px] tracking-[-0.3px]
`
  .replace(/\s+/g, " ")
  .trim();

export const TEXT_LABEL_VALUE_VARIANT = {
  label: `${TEXT_LABEL_VALUE} text-[#636C73] font-semibold`,
  softlabel: `${TEXT_LABEL_VALUE} text-[#B8BFC4] font-semibold`,
  text: `${TEXT_LABEL_VALUE} text-[#5A636A] !font-regular !font-weight-400 !line-height-[21.25px] !tracking-[0%]`,
  input: `${TEXT_LABEL_VALUE} text-[#5A636A]`,
  textarea: `${TEXT_LABEL_VALUE} text-[#5A636A]`,
  checkbox: `${TEXT_LABEL_VALUE} text-[#5A636A]`,
};
