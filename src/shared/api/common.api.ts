import { api } from "./api";
import axios from "axios";
const commonApi = () => {
  const { get, post } = api();

  return {
    // getMemberCount: (data: Record<string, any>) => {
    //   return get(`admin/member/count`, data);
    // },

    // getVisitorCount: (data: Record<string, any>) => {
    //   return get(`visit`, data);
    // },

    fileDownload: (data: { objectKey: string }) => {
      return post(`/v1/common/file/download`, data, {
        responseType: "blob",
      });
    },

    getFileUploadUrl: (data: { fileType: string; extension: string }) => {
      return get(`/v1/common/file/upload/url`, data);
    },

    cloudFileUpload: async (url: string, file: File) => {
      try {
        const response = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        return response;
      } catch (error) {
        console.error("cloudFileUpload 실패:", error);
      }
    },

    fileUpload: (data: FormData) => {
      return post(`common/file/upload`, data);
    },
  };
};

export default commonApi;
