import { useState } from "react";
import XButton from "../../atoms/button/XButton";
import PretendardText from "../../atoms/text/PretendardText";

interface ImgPreviewProps {
  fileUrl: string;
  xBtnHandler: () => void;
}

const ImgPreview: React.FC<ImgPreviewProps> = ({ fileUrl, xBtnHandler }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  return (
    <div
      className={`relative w-[90px] h-[90px] border-[1px] border-gray-300 rounded-[3px] ${
        !isImageLoaded && "bg-gray-400 flex items-center justify-center"
      }`}
    >
      {isImageLoaded ? (
        <img
          className="w-full !h-full object-cover rounded-[3px]"
          src={fileUrl}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          onError={() => {
            setIsImageLoaded(false);
          }}
          alt="미리보기 이미지"
        />
      ) : (
        <PretendardText className="text-gray-1000 text-[10px] font-semibold text-center">
          이미지를
          <br />
          불러오는데
          <br />
          실패했습니다.
        </PretendardText>
      )}
      <XButton
        className={"w-[20px] h-[20px] absolute top-[6px] right-[6px]"}
        isDark={true}
        onClick={xBtnHandler}
      />
    </div>
  );
};

export default ImgPreview;
