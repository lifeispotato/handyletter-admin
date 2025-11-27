import { StyleProps } from "../../types";
import classNameMerge from "../../utils/classNameMerge";
import IconImg from "./IconImg";

interface TableEmptyImageProps extends StyleProps {
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
}

const TableEmptyImage: React.FC<TableEmptyImageProps> = ({
  className = "",
  style = {},
  iconClassName = "",
  iconStyle = {},
}) => {
  return (
    <div
      className={classNameMerge([
        "w-[57px] h-[52px] bg-gray-100",
        "flex items-center justify-center",

        className,
      ])}
      style={{
        ...style,
      }}
    >
      <IconImg
        className={classNameMerge(["w-[29.71px] h-[32px]", iconClassName])}
        style={{
          ...iconStyle,
        }}
        src="/assets/admin/icons/ic_empty_image.svg"
        alt="이미지 없음"
      />
    </div>
  );
};

export default TableEmptyImage;
