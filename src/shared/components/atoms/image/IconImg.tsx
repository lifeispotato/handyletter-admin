import classNameMerge from "../../../utils/classNameMerge";
import type { StyleProps } from "../../../types";
import ICON_SRC_MAPPING from "../../../constants/iconSrcMapping";

interface IconImgProps extends StyleProps {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

const IconImg = ({
  className = "",
  style = {},
  src,
  alt,
  size = "md",
}: IconImgProps) => {
  const sizeClasses = {
    xs: "w-[12px] h-[12px]",
    sm: "w-[16px] h-[16px]",
    md: "w-[20px] h-[20px]",
    lg: "w-[24px] h-[24px]",
    xl: "w-[32px] h-[32px]",
  };

  const sizeClass =
    typeof size === "number"
      ? `w-[${size}px] h-[${size}px]`
      : sizeClasses[size];

  return (
    <img
      className={classNameMerge([sizeClass, className])}
      style={style}
      src={ICON_SRC_MAPPING[src]}
      alt={alt}
    />
  );
};

export default IconImg;
