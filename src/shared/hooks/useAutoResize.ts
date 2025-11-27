import { useRef, useCallback, useEffect } from "react";

// 자동 크기 조절 상수
const AUTO_RESIZE_CONFIG = {
  MAX_HEIGHT: 192,
  PADDING: {
    NORMAL: "13px 15px",
    SCROLL: "13px 0px 13px 15px",
  },
} as const;

export const useAutoResize = (value: string, isInfinity?: boolean) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    const needsScroll =
      !isInfinity && textarea.scrollHeight >= AUTO_RESIZE_CONFIG.MAX_HEIGHT;

    textarea.style.overflowY = needsScroll ? "auto" : "hidden";
    textarea.style.padding = needsScroll
      ? AUTO_RESIZE_CONFIG.PADDING.SCROLL
      : AUTO_RESIZE_CONFIG.PADDING.NORMAL;
  }, [isInfinity]);

  // value가 변경될 때마다 리사이즈
  useEffect(() => {
    resizeHeight();
  }, [value, resizeHeight]);

  return { textareaRef, resizeHeight };
};
