import { fileDownload } from "../../../utils/fileManagement";
import PretendardText from "../../atoms/text/PretendardText";

interface FileNamePreviewProps {
  fileOriginName?: string;
  fileStoredName?: string;
}

function FileNamePreview({
  fileOriginName,
  fileStoredName,
}: FileNamePreviewProps) {
  return (
    <>
      <div className="flex items-end gap-[12px]">
        {fileOriginName ? (
          <>
            <button
              className={`
                flex items-center
                gap-[4px] px-[20px] py-[10px]
                rounded-full
                border border-gray-500
                bg-white hover:bg-gray-200
                transition
                `}
              onClick={() => {
                if (fileOriginName && fileStoredName) {
                  fileDownload(fileOriginName, fileStoredName);
                }
              }}
            >
              <img
                src="/assets/admin/icons/ic_download_gray.png"
                alt=""
                className="w-[18px] h-[18px]"
              />
              <PretendardText className="max-w-[150px] text-[16px] font-medium tracking-[-0.048px] text-gray-600 truncate">
                {fileOriginName}
              </PretendardText>
            </button>
          </>
        ) : (
          <>
            <PretendardText className="text-[15px] font-normal text-gray-600">
              첨부된 파일이 없습니다.
            </PretendardText>
          </>
        )}
      </div>
    </>
  );
}

export default FileNamePreview;
