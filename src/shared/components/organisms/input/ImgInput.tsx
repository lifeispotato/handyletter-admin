import commonApi from "../../../api/common.api";
import { errorHandler } from "../../../utils/errorHandler";
import PretendardText from "../../atoms/text/PretendardText";
import { AxiosError } from "axios";
import { ImageType } from "../../../types/data.types";

interface ImgInputProps {
  id: string;
  accept: string;
  originValue: ImageType | null;
  setValue: (value: ImageType) => void;
  originName: string;
  storedName: string;
  isRequired?: boolean;
  fileType: string;
}

const ImgInput: React.FC<ImgInputProps> = ({
  id,
  accept,
  originValue,
  setValue,
  originName,
  storedName,
  isRequired,
  fileType,
}) => {
  const { getFileUploadUrl, cloudFileUpload } = commonApi();

  const handleGetFileUploadUrl = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!extension) throw new Error("파일 확장자를 추출할 수 없습니다.");

      const response = (
        (await getFileUploadUrl({
          fileType,
          extension,
        })) as {
          data: {
            data: { content: { presignedUrl: string; objectKey: string } };
          };
        }
      ).data.data.content;

      const fileReader = new FileReader();

      // ✅ onload 안에서 handleCloudFileUpload 호출
      fileReader.onload = () => {
        const temporaryUrl = fileReader.result as string;

        handleCloudFileUpload(
          response.objectKey,
          response.presignedUrl,
          file,
          temporaryUrl
        );
      };

      fileReader.readAsDataURL(file);
      e.target.value = ""; // input 초기화
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handleCloudFileUpload = async (
    objectKey: string,
    url: string,
    file: File,
    temporaryUrl: string
  ) => {
    try {
      const response = (await cloudFileUpload(url, file)) as {
        config: { data: { name: string } };
      };

      setValue({
        ...(originValue ?? {
          imageOriginName: "",
          imageStoredName: "",
          temporaryUrl: "",
        }),
        temporaryUrl,
        [originName]: response.config.data.name,
        [storedName]: objectKey,
      });
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        id={id}
        accept={accept}
        required={isRequired}
        onChange={(e) => {
          handleGetFileUploadUrl(e);
        }}
        className="absolute h-0 w-0 overflow-hidden border-0 p-0"
      />
      {/* Label for File Input */}
      <label
        htmlFor={id}
        className={`
          h-[90px] w-[90px]
          cursor-pointer
          flex-center flex-col
          gap-[5px] rounded-[3px]
          border border-dashed border-gray-300
          bg-white
        `}
      >
        <img
          src={
            accept.includes("video")
              ? "/assets/admin/icons/ic_camera.png"
              : "/assets/admin/icons/ic_camera.png"
          }
          alt={accept.includes("video") ? "영상 등록" : "이미지 등록"}
          className="h-[18px] w-[26px]"
        />
        <PretendardText className="text-gray-500 text-[15px] font-semibold">
          {accept.includes("video") ? "영상" : "이미지"} 등록
        </PretendardText>
      </label>
    </>
  );
};

export default ImgInput;
