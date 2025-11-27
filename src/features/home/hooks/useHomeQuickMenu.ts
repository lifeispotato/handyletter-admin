import { useEffect, useState } from "react";
import { route } from "../../../routes/route";
import useMoveToPage from "../../../shared/hooks/useMoveToPage";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "../../../shared/store/loginInfoState";

interface SubMenuItem {
  title: string;
  route: string;
  isView?: boolean;
}

interface RouteItem {
  title: string;
  value: string;
  subMenu: SubMenuItem[];
  isView?: boolean;
}

const useHomeQuickMenu = () => {
  // ===== 빠른 메뉴 이동 관련 ===== //
  const { moveToPage } = useMoveToPage();
  const [searchParams] = useSearchParams();
  const loginInfo = useRecoilValue(loginInfoState);
  const [ROUTE_LIST, setROUTE_LIST] = useState<RouteItem[]>([]);

  const INITIAL_ROUTE_LIST: RouteItem[] = [
    {
      title: "사용자 관리",
      value: "user",
      subMenu: [
        { title: "회원 정보", route: "" }
      ],
    },
    {
      title: "결제 관리",
      value: "payment",
      subMenu: [
        { title: "결제 내역", route: "" }
      ],
    },
    {
      title: "메뉴 관리",
      value: "menu",
      subMenu: [
        { title: "메뉴 등록", route: "" }
      ],
    },
  ];

  // 마운트 시
  useEffect(() => {

    moveToPage(`${route.home}`);
  }, []);

  // loginInfo가 변경될 때마다 메뉴 권한 체크 - 권한 관계없이 모든 메뉴 표시
  useEffect(() => {
    // 권한 관계없이 모든 메뉴 표시 (구조만 보기 위한 목적)
    const updatedRouteList = JSON.parse(JSON.stringify(INITIAL_ROUTE_LIST));
    
    for (const category of updatedRouteList) {
      category.isView = true;
      for (const menu of category.subMenu) {
        menu.isView = true;
      }
    }

    setROUTE_LIST(updatedRouteList);
  }, [loginInfo]);

  const handleChangeTab = (tab: string) => {
    moveToPage(`${route.home}?tab=${tab}`);
  };

  return { moveToPage, searchParams, handleChangeTab, ROUTE_LIST };
};

export default useHomeQuickMenu;
