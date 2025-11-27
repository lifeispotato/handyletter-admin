import XButton from "../../atoms/button/XButton";
import PretendardText from "../../atoms/text/PretendardText";

interface FilePreviewProps {
  fileOriginName: string;
  xBtnHandler: () => void;
}

const FilePreview = ({ fileOriginName, xBtnHandler }: FilePreviewProps) => {
  return (
    <div className="flex items-center gap-[5px] px-[12px] py-[6px] border border-line-200 rounded-[50px]">
      <img
        src="/assets/admin/icons/ic_file_color.png"
        className="w-[16px] h-[16px]"
      />
      <PretendardText className="text-[13px] font-normal text-gray-700">
        {fileOriginName}
      </PretendardText>
      <XButton
        className={"w-[16px] h-[16px]"}
        isDark={true}
        onClick={xBtnHandler}
      />
    </div>
  );
};

export default FilePreview;
