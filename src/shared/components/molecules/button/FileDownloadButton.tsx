import { StyleProps } from "../../../types";
import classNameMerge from "../../../utils/classNameMerge";
import PretendardText from "../../atoms/text/PretendardText";

interface FileDownloadButtonProps extends StyleProps {
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const FileDownloadButton: React.FC<FileDownloadButtonProps> = ({
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
        "w-fit h-fit p-[10px_20px] rounded-[23px] bg-white hover:bg-gray-100",
        "border-[1px] border-gray-500 transition",
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

      <PretendardText className="!text-[16px] !font-medium !leading-[22px] !tracking-[-0.3%] !text-gray-600">
        {children}
      </PretendardText>
    </button>
  );
};

export default FileDownloadButton;
