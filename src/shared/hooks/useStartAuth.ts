import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export interface ParsedDataType {
  data: {
    res_cd: string;
    res_msg: string;
    up_hash: string;
    kcp_merchant_time: string;
    kcp_cert_lib_ver: string;
  };
  site_cd: string;
  ordr_idxx: string;
  web_siteid: string;
  web_siteid_hashYN: string;
}

const useStartAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HTML에서 데이터를 추출하는 함수
  const parseHtmlResponse = (htmlString: string): ParsedDataType => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // res_cd와 res_msg 추출
    const res_cd = doc.getElementById("res_cd")?.textContent || "";
    const res_msg = doc.getElementById("res_msg")?.textContent || "";

    // form의 hidden input들에서 데이터 추출
    const form = doc.querySelector('form[name="form_hash"]');
    const formData: Record<string, string> = {};

    if (form) {
      const inputs = form.querySelectorAll('input[type="hidden"]');
      inputs.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        formData[inputElement.name] = inputElement.value;
      });
    }

    return {
      data: {
        res_cd: res_cd,
        res_msg: res_msg,
        up_hash: formData.up_hash || "",
        kcp_merchant_time: formData.kcp_merchant_time || "",
        kcp_cert_lib_ver: formData.kcp_cert_lib_ver || "",
      },
      site_cd: formData.site_cd || "",
      ordr_idxx: formData.ordr_idxx || "",
      web_siteid: formData.web_siteid || "",
      web_siteid_hashYN: formData.web_siteid_hashYN || "",
    };
  };

  const startAuth = async () => {
    setIsLoading(true);
    try {
      // 현재 시간으로 주문번호 생성 (EJS와 동일한 방식)
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const time = now.getTime();

      const monthStr = month < 10 ? "0" + month : month.toString();
      const ordr_idxx = year + "" + monthStr + "" + date + "" + time;

      // KCP 형식에 맞는 날짜 생성 (YYMMDDHHMMSS)
      const str_year = now.getFullYear().toString();
      const year2 = str_year.substring(2, 4); // substr 대신 substring 사용
      const month2 = now.getMonth() + 1;
      const monthStr2 =
        month2 < 10 ? "0" + month2.toString() : month2.toString();
      const day = now.getDate();
      const dayStr = day < 10 ? "0" + day.toString() : day.toString();
      const hour = now.getHours();
      const hourStr = hour < 10 ? "0" + hour.toString() : hour.toString();
      const minutes = now.getMinutes();
      const minutesStr =
        minutes < 10 ? "0" + minutes.toString() : minutes.toString();
      const seconds = now.getSeconds();
      const secondsStr =
        seconds < 10 ? "0" + seconds.toString() : seconds.toString();

      const make_req_dt =
        year2 + monthStr2 + dayStr + hourStr + minutesStr + secondsStr;

      // 1단계: 서버에서 up_hash 생성 요청 (HTML 응답을 받음)
      const hashResponse = await axios.post(
        `${import.meta.env.VITE_LANDAS_ADMIN_URL}/api/kcp/kcp_api_hash`,
        // "http://localhost:8090/kcp/kcp_api_hash",
        {
          ct_type: "HAS",
          ordr_idxx: ordr_idxx,
          make_req_dt: make_req_dt,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // HTML에서 데이터 추출
      const parsedData = parseHtmlResponse(hashResponse.data);

      // 2단계: hash 생성이 성공했는지 확인
      if (parsedData && parsedData.data && parsedData.data.res_cd === "0000") {
        const data = parsedData.data;

        // 4단계: kcp_cert_start로 폼 데이터 전송
        const formData: Record<string, string> = {
          site_cd: parsedData.site_cd,
          ordr_idxx: parsedData.ordr_idxx,
          web_siteid: parsedData.web_siteid,
          up_hash: data.up_hash,
          kcp_merchant_time: data.kcp_merchant_time,
          kcp_cert_lib_ver: data.kcp_cert_lib_ver,
          web_siteid_hashYN: parsedData.web_siteid_hashYN,
        };

        // 데스크톱에서는 기존 팝업 방식 유지
        // 3단계: 팝업창 열기
        const width = 410;
        const height = 500;
        const leftpos = window.screen.width / 2 - width / 2;
        const toppos = window.screen.height / 2 - height / 2;
        const winopts = `width=${width}, height=${height}, toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no`;
        const position = `,left=${leftpos}, top=${toppos}`;

        const authWindow = window.open("", "auth_popup", winopts + position);

        if (!authWindow) {
          throw new Error(
            "팝업 창을 열 수 없습니다. 팝업 차단을 해제해주세요."
          );
        }

        // 폼 생성하여 POST 요청
        const form = document.createElement("form");
        form.method = "POST";
        form.action = `${
          import.meta.env.VITE_LANDAS_ADMIN_URL
        }/api/kcp/kcp_cert_start`;
        // form.action = "http://localhost:8090/kcp/kcp_cert_start";
        form.target = "auth_popup";

        Object.keys(formData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } else {
        const errorMsg =
          parsedData?.data?.res_msg || "up_hash 생성에 실패했습니다.";
        throw new Error(
          `에러 코드: ${parsedData?.data?.res_cd}, 에러 메시지: ${errorMsg}`
        );
      }
    } catch (error) {
      toast("본인인증 시작 오류:" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return { startAuth, isLoading };
};

export default useStartAuth;
