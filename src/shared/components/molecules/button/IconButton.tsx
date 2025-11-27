import React, { useState } from "react";
import { StyleProps } from "./../../../types";
import classNameMerge from "../../../utils/classNameMerge";
import ICON_SRC_MAPPING from "../../../constants/iconSrcMapping";

interface IconButtonProps extends StyleProps {
  imgSrc: string;
  activeImgSrc?: string;
  title?: string;
  alt?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  className = "",
  style,
  imgSrc,
  activeImgSrc,
  title,
  alt = "",
  disabled,
  onClick,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={(e) => {
        e.stopPropagation();
        if (activeImgSrc) {
          setIsHover(true);
        }
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        if (activeImgSrc) {
          setIsHover(false);
        }
      }}
      onClick={onClick}
      title={title || alt}
      disabled={disabled}
    >
      <img
        className={classNameMerge(["w-[16px] h-[16px]", className])}
        style={{
          ...style,
        }}
        src={isHover && activeImgSrc ? activeImgSrc : imgSrc}
        alt={alt}
        onError={(e) => {
          // 대체 이미지 경로
          e.currentTarget.src = ICON_SRC_MAPPING.xbox;
        }}
      />
    </button>
  );
};

export default IconButton;
