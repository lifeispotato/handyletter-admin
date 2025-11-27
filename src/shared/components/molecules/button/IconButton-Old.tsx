import type { IconButtonProps } from "@/shared/types/buttonTypes";
import classNameMerge from "@/shared/classNameMerge";
import IconImg from "@/shared/components/atoms/image/IconImg";
import BasicButton from "@/shared/components/atoms/button/BasicButton";

const IconButton_Old = ({
  className = "",
  style = {},
  children = "",
  icon,
  iconClassName = "",
  isDisabled = false,
  type = "button",
  title = "",
  id,
  onClick = () => {},
}: IconButtonProps) => {
  return (
    <BasicButton
      className={classNameMerge([
        "flex items-center justify-center gap-[6px]",
        className,
      ])}
      style={style}
      onClick={onClick}
      type={type}
      isDisabled={isDisabled}
      id={id}
      title={title}
    >
      <div className="flex items-center gap-[6px]">
        <IconImg
          src={icon}
          alt={icon}
          className={classNameMerge(["h-[18px] w-[18px]", iconClassName])}
        />
        {children}
      </div>
    </BasicButton>
  );
};

export default IconButton_Old;
