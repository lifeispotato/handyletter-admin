import ICON_SRC_MAPPING from "../../constants/iconSrcMapping";
import { StyleProps } from "./../../types";
import classNameMerge from "./../../utils/classNameMerge";

interface IconImgProps extends StyleProps {
  src: string;
  alt: string;
}

const IconImg: React.FC<IconImgProps> = ({
  className = "",
  style = {},
  src,
  alt,
}) => {
  return (
    <img
      className={classNameMerge(["w-[20px] h-[20px]", className])}
      style={{
        ...style,
      }}
      src={src}
      alt={alt}
      onError={(e) => {
        // 대체 이미지 경로
        e.currentTarget.src = ICON_SRC_MAPPING.xbox;
      }}
    />
  );
};

export default IconImg;
