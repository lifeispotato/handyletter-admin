import classNameMerge from "../../utils/classNameMerge";

interface FilterTildeProps {
  className?: string;
  style?: React.CSSProperties;
}

const FilterTilde: React.FC<FilterTildeProps> = ({
  className = "",
  style = {},
}) => {
  return (
    <span
      className={classNameMerge(["w-[14px] h-[1px] bg-gray-400", className])}
      style={{
        ...style,
      }}
    />
  );
};

export default FilterTilde;
