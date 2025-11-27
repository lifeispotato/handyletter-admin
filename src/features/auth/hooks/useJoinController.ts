import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { route } from "../../../routes/route";
import useAuth from "../../../shared/hooks/useAuth";
import useMoveToPage from "../../../shared/hooks/useMoveToPage";
import { errorHandler } from "../../../shared/utils/errorHandler";
import { sideMenu } from "../../sidebar/constants/sidebarMenu";
import authApi from "../api/auth.api";

const useJoinController = () => {
  // =========================================================================
  // 공통
  // =========================================================================
  const { join, checkUserId } = authApi();
  const { moveToPage } = useMoveToPage();

  // =========================================================================
  // 상태관리
  // =========================================================================
  const [userId, setUserId] = useState("");
  const [userIdDuplicateCheck, setUserIdDuplicateCheck] = useState(false);
  const [userIdDuplicateError, setUserIdDuplicateError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState("");
  const [isCertificated, setIsCertificated] = useState(false);
  const [certificateError, setCertificateError] = useState("");

  // =========================================================================
  // 본인인증
  // =========================================================================
  const location = useLocation();
  const authData = location.state?.authData;

  // 본인인증 훅 사용
  useAuth({
    onAuthSuccess: (data) => {
      moveToPage(route.join, () => {}, {
        state: {
          authData: data,
        },
      });
    },
  });

  useEffect(() => {
    if (authData) {
      setName(authData.user_name);
      setPhoneNumber(authData.phone_no);
    }
  }, [authData]);

  // =========================================================================
  // 비밀번호 일치 여부
  // =========================================================================
  // 비밀번호 일치 여부 (둘 다 빈 문자열이 아닐 때만 비교)
  const isPasswordMatch = useMemo(() => {
    if (password.trim() !== "" && passwordCheck.trim() !== "") {
      return password === passwordCheck;
    } else {
      return true;
    }
  }, [password, passwordCheck]);

  // 비밀번호 오류 여부
  const passwordError = useMemo(() => {
    if (!password) return undefined;

    if (password.length < 8) {
      return "비밀번호를 8자 이상으로 입력해 주세요.";
    }

    // 영문, 숫자, 특수문자 각각 정규식
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

    const count = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length;

    if (count < 2 || password.length > 16) {
      return "비밀번호 조합이 올바르지 않습니다.";
    }

    return undefined;
  }, [password]);

  // 비밀번호체크 오류 여부
  const passwordCheckError = useMemo(() => {
    if (password.trim() !== "" && passwordCheck.trim() !== "" && password !== passwordCheck) {
      return "비밀번호가 일치하지 않습니다";
    }
  }, [password, passwordCheck]);

  const requestCertificationNumber = () => {
    setIsTimerActive(true);
    setCertificateError("");
  };

  // =========================================================================
  // 아이디 중복 확인
  // =========================================================================
  const checkUserIdFunc = async () => {
    try {
      const response = (await checkUserId({ account: userId || "" })).data.data.content;

      if (response.isDuplicate) {
        setUserIdDuplicateError("이미 존재하는 아이디입니다.");
      } else {
        setUserIdDuplicateError("");
        setUserIdDuplicateCheck(true);
        toast("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  // 모든 메뉴의 링크를 추출하되 '빠른 단가 관리' 메뉴는 제외
  const extractLinks = () => {
    const links: string[] = [];

    const extractSubMenuLinks = (subMenus: any[]) => {
      subMenus.forEach((subMenu) => {
        // subMenus02가 있으면 하위 메뉴만 추가
        if (subMenu.subMenus02 && subMenu.subMenus02.length > 0) {
          extractSubMenuLinks(subMenu.subMenus02);
        } else if (subMenu.link && subMenu.title !== "빠른 단가 수정") {
          // subMenus02가 없는 경우에만 현재 메뉴의 링크 추가
          links.push(subMenu.link);
        }
      });
    };

    sideMenu.forEach((menu) => {
      // 홈 메뉴 제외
      if (menu.title !== "홈") {
        // 최상위 메뉴의 링크는 추가하지 않고 하위 메뉴만 처리
        if (menu.subMenus) {
          extractSubMenuLinks(menu.subMenus);
        }
      }
    });

    return JSON.stringify(links);
  };

  const accessMenu = extractLinks();

  // =========================================================================
  // 회원가입
  // =========================================================================
  const handleJoin = async () => {
    try {
      if (!authData) {
        return toast("본인인증을 진행해주세요");
      }

      if (!userId || !password || !name || !phoneNumber) {
        return toast("모든 값을 입력해주세요");
      }

      if (!userIdDuplicateCheck) {
        return toast("아이디 중복 확인을 해주세요");
      }

      if (passwordError) {
        return toast("비밀번호 형식이 옳바르지 않습니다");
      }

      if (passwordCheckError) {
        return toast("비밀번호가 일치하지 않습니다");
      }

      const joinData = { userId, password, name, phoneNumber, accessMenu };

      await join(joinData);
      moveToPage(route.join_complete, () => {}, { replace: true });
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return {
    userId,
    setUserId,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    handleJoin,
    isPasswordMatch,
    passwordError,
    passwordCheckError,
    isCertificated,
    setIsCertificated,
    certificationNumber,
    setCertificationNumber,
    isTimerActive,
    setIsTimerActive,
    certificateError,
    setCertificateError,
    requestCertificationNumber,
    checkUserIdFunc,
    userIdDuplicateError,
    authData,
  };
};

export default useJoinController;
