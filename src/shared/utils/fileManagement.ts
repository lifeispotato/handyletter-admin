import { AxiosError } from "axios";
import commonApi from "./../api/common.api";
import { errorHandler } from "./errorHandler";
interface FileUploadResponse {
  serverFileName: string;
}

// = 파일 다운로드 ========================================== //
export const fileDownload = async (
  originalFileName: string,
  objectKey: string
) => {
  const { fileDownload } = commonApi();

  try {
    const data = { objectKey };
    const response = (await fileDownload(data)).data;

    // 확장자 추출
    // const fileExtension = serverFileName.split(".").pop();

    // 모든 파일에 대해 '첨부파일'이라는 이름으로 다운로드
    const fileName = `${originalFileName}`;

    if (typeof response === "string") {
      downloadBase64File(response, fileName);
    }
  } catch (error) {
    errorHandler(error as AxiosError);
  }
};

const downloadBase64File = (base64Data: string, fileName: string) => {
  // MIME 타입을 고정하여 지정
  const mimeType = "application/octet-stream";

  // base64 데이터를 디코딩하여 Blob 객체 생성
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(null)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  // Blob 객체를 사용하여 다운로드 링크 생성 및 클릭 이벤트 트리거
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// = 파일 업로드 =========================================== //
export const fileUpload = async (path: string, file: File) => {
  const { fileUpload: uploadFileApi } = commonApi();

  try {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("file", file);

    const response = (await uploadFileApi(formData)).data;

    if (
      !response ||
      typeof response !== "object" ||
      !("serverFileName" in response)
    ) {
      throw new Error("파일 업로드 응답 형식이 올바르지 않습니다.");
    }

    const typedResponse = response as FileUploadResponse;

    return {
      imageOriginFileName: file.name,
      imageServerFileName: typedResponse.serverFileName,
    };
  } catch (error) {
    errorHandler(error as AxiosError);
  }
};
