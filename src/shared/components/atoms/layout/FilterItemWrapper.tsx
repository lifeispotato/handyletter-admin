import classNameMerge from "./../../../utils/classNameMerge";
interface FilterItemWrapperProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const FilterItemWrapper: React.FC<FilterItemWrapperProps> = ({
  className = "",
  style = {},
  children,
}) => {
  return (
    <div
      className={classNameMerge([
        "w-fit h-fit flex flex-col gap-[8px]",
        className,
      ])}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FilterItemWrapper;
