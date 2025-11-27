import { StyleProps } from "../../../types";
import classNameMerge from "../../../utils/classNameMerge";
import PretendardText from "../../atoms/text/PretendardText";

interface ExcelOutlineButtonProps extends StyleProps {
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const ExcelOutlineButton: React.FC<ExcelOutlineButtonProps> = ({
  disabled = false,
  className = "",
  style = {},
  children,
  onClick = () => {},
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNameMerge([
        "w-fit h-fit p-[10px_20px] rounded-[23px] transition",
        "border-[1px] border-gray-500 hover:bg-gray-100",
        "flex items-center justify-center gap-[4px]",
        className,
      ])}
      style={{
        ...style,
      }}
    >
      <img
        src="/assets/admin/icons/ic_download_gray.png"
        alt=""
        className="h-[18px] w-[18px]"
      />

      <PretendardText className="text-[16px] font-medium leading-[22px] tracking-[-0.3%] text-gray-600">
        {children ? children : "엑셀 다운로드"}
      </PretendardText>
    </button>
  );
};

export default ExcelOutlineButton;
