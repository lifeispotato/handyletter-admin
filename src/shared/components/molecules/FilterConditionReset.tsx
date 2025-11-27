import classNameMerge from "../../utils/classNameMerge";
import PretendardText from "../atoms/text/PretendardText";
import FillButton from "../atoms/button/FillButton";

interface FilterConditionResetProps {
  className?: string;
  style?: React.CSSProperties;
  resetHandler: () => void;
  searchHandler: () => void;
}

const FilterConditionReset: React.FC<FilterConditionResetProps> = ({
  className = "",
  style = {},
  resetHandler,
  searchHandler,
}) => {
  return (
    <div
      className={classNameMerge(["flex items-center gap-[16px]", className])}
      style={{
        ...style,
      }}
    >
      <div
        className={classNameMerge([
          "py-[12.5px] px-[8px] rounded-[8px]",
          "cursor-pointer hover:bg-primary/5 transition",
          "flex items-center gap-[8px]",
        ])}
        onClick={resetHandler}
      >
        <PretendardText className="font-semibold text-[14px] text-gray-700">
          검색조건 초기화
        </PretendardText>
        <img
          src="/assets/admin/icons/ic_reload.png"
          className="w-[24px] h-[24px]"
        />
      </div>
      <FillButton
        className="bg-primary w-[96px]"
        title="검색"
        onClick={searchHandler}
      />
    </div>
  );
};

export default FilterConditionReset;
