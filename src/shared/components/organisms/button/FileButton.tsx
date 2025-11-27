// import { fileDownload } from "./../../../../util/fileManagement";

import PretendardText from "../../atoms/text/PretendardText";
import { cn } from "../../../utils/style";

interface FileButtonProps {
  disabled?: boolean;
  className?: string;
  fileName: string;
}

const FileButton: React.FC<FileButtonProps> = ({
  disabled,
  className,
  fileName,
}) => {
  return (
    <div className="relative w-fit">
      <button
        disabled={disabled}
        onClick={() => {
          // fileDownload(serverFileName, fileName);
        }}
        className={cn(
          "flex-center",
          "gap-[4px]",
          "h-[42px]",
          "w-fit",
          "px-[20px]",
          "py-[10px]",
          "rounded-[50px]",
          "bg-white",
          "hover:bg-gray-200",
          "border-[1px]",
          "border-gray-1000",
          "transition",
          className
        )}
      >
        <img
          src="/assets/admin/icons/ic_download_gray.png"
          alt=""
          className="h-[18px] w-[18px]"
        />

        <PretendardText className="text-[16px] font-medium text-gray-1100">
          {fileName}
        </PretendardText>
      </button>
    </div>
  );
};

export default FileButton;
