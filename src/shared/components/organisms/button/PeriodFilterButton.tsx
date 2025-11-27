import { StyleProps } from "../../../types";
import { DateRangeType } from "../../../types/dataRange.types";
import classNameMerge from "../../../utils/classNameMerge";
import OutlineButton from "../../atoms/button/OutlineButton";
import PretendardText from "../../atoms/text/PretendardText";

interface PeriodFilterButtonProps extends StyleProps {
  titleClassName?: string;
  buttonClassName?: string;
  title: string;
  selectedDateRange?: DateRangeType;
  setDateRangeType: (type: DateRangeType) => void;
}

const buttonList: { label: string; value: DateRangeType }[] = [
  { label: "오늘", value: "today" },
  { label: "1주일", value: "week" },
  { label: "한달", value: "month" },
  { label: "두달", value: "two_month" },
  { label: "전체", value: "" },
];

const PeriodFilterButton: React.FC<PeriodFilterButtonProps> = ({
  className = "",
  style = {},
  titleClassName = "",
  title,
  selectedDateRange,
  buttonClassName = "",
  setDateRangeType,
}) => {
  const handleClick = (type: DateRangeType) => {
    setDateRangeType(type);
  };

  return (
    <div
      className={classNameMerge(["flex items-center gap-2", className])}
      style={{ ...style }}
    >
      <PretendardText
        className={classNameMerge(["font-medium text-[16px]", titleClassName])}
      >
        {title}
      </PretendardText>
      {buttonList.map(({ label, value }) => (
        <OutlineButton
          key={label}
          title={label}
          className={classNameMerge([
            "py-[3px] px-[8px] h-fit !text-[14px] font-medium",
            selectedDateRange === value ? "border-primary" : "border-line-200",
            buttonClassName,
          ])}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

export default PeriodFilterButton;
