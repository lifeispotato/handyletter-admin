import { useDaumPostcodePopup } from "react-daum-postcode";

interface DaumPostData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  sido: string;
  sigungu: string;
}

const postcodeScriptUrl =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export const useDaumPost = (
  saveFunc: (address: string) => void,
  type?: string
) => {
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: DaumPostData) => {
    if (type === "full") {
      // 전체 주소를 saveFunc에 전달
      saveFunc(
        `${data.address} ${data.buildingName ? `(${data.buildingName})` : ""}`
      );
    } else {
      const localAddress = `${data.sido} ${data.sigungu}`; // 시, 도 + 시, 군, 구

      if (data.addressType === "R") {
        // 지역 주소(localAddress)를 saveFunc에 전달
        saveFunc(localAddress);
      }
    }
  };

  const handleDaumPost = () => {
    open({ onComplete: handleComplete });
  };

  return handleDaumPost;
};
