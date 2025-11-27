import type { ArrowButtonProps } from "../../../types/buttonTypes";
import classNameMerge from "../../../classNameMerge";
import IconImg from "../../atoms/image/IconImg";
import BasicButton from "../../atoms/button/BasicButton";

const DIRECTION_ICON_MAPPING = {
  first: "double_arrow_black",
  prev: "arrow_left",
  next: "arrow_right",
  last: "double_arrow_white",
} as const;

const ArrowButton = ({
  className = "",
  style = {},
  children = "",
  icon,
  direction,
  isDisabled = false,
  type = "button",
  title = "",
  id,
  onClick = () => {},
}: ArrowButtonProps) => {
  // direction이 있으면 자동으로 아이콘 결정, 없으면 icon prop 사용
  const finalIcon = direction ? DIRECTION_ICON_MAPPING[direction] : icon;
  return (
    <BasicButton
      className={classNameMerge([className])}
      style={{
        ...style,
      }}
      onClick={onClick}
      type={type}
      isDisabled={isDisabled}
      id={id}
      title={title}
    >
      {finalIcon && (
        <IconImg
          src={finalIcon}
          alt={finalIcon}
          size="md"
          className={classNameMerge(["h-[16px] w-[16px] cursor-pointer"])}
        />
      )}
      {children}
    </BasicButton>
  );
};

export default ArrowButton;
