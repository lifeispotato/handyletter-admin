import { useState } from "react";
import { imgUrl, tempImgUrl } from "../../../constants/url";
import { fileDownload } from "../../../utils/fileManagement";
import PretendardText from "../../atoms/text/PretendardText";
import { toast } from "react-toastify";

interface ImgFilePreviewProps {
  imageOriginName?: string;
  imageStoredName?: string;
  isVideo?: boolean;
}

function ImgFilePreview({
  imageOriginName,
  imageStoredName,
  isVideo,
}: ImgFilePreviewProps) {
  const [isImgValid, setIsImgValid] = useState(true);

  return (
    <>
      <div className="flex items-end gap-[12px]">
        {imageOriginName ? (
          <>
            {isVideo ? (
              <video
                className="w-[90px] !h-[90px] rounded object-cover"
                src={`${imgUrl}/${imageStoredName}`}
                muted
                playsInline
                controls={false} // 컨트롤 표시 안 함
                onClick={(e) => e.preventDefault()} // 클릭 시 재생 방지
              />
            ) : (
              <img
                className="w-[90px] !h-[90px] rounded object-cover"
                src={`${imgUrl}/${imageStoredName}`}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = `${tempImgUrl}/${imageStoredName}`;
                  setIsImgValid(false);
                }}
                alt=""
              />
            )}

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
                if (!isImgValid) {
                  toast("현재 해당 기능을 이용할 수 없습니다.");
                  return;
                }

                if (imageOriginName && imageStoredName) {
                  fileDownload(imageOriginName, imageStoredName);
                }
              }}
            >
              <img
                src="/assets/admin/icons/ic_download_gray.png"
                alt=""
                className="w-[18px] h-[18px]"
              />
              <PretendardText className="max-w-[150px] text-[16px] font-medium tracking-[-0.048px] text-gray-600 truncate">
                {imageOriginName}
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

export default ImgFilePreview;
