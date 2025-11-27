import classNameMerge from "../../../../shared/utils/classNameMerge";
import { StyleProps } from "./../../../types";

interface TabButtonProps extends StyleProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  className = "",
  style = {},
  children,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={classNameMerge([
        "w-[125px] h-fit p-[12px_10px] border-primary flex-shrink-0",
        "font-sans !font-semibold !text-[14px] !leading-[22.8px]",
        isSelected ? "border-b-[2px] text-primary" : "border-0 text-gray-400",
        className,
      ])}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TabButton;
