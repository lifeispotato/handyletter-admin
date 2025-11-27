// SidebarController.js
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "@/shared/store/loginInfoState";
import {
  MenuItem,
  sideMenu,
  SubMenu,
  SubMenu02,
} from "@/features/sidebar/constants/sidebarMenu";

const useSidebarController = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isSubOpen, setIsSubOpen] = useState<SubMenu | null>(null);
  const [path, setPath] = useState<string | null>(null);
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(true);
  const loginInfo = useRecoilValue(loginInfoState);
  const [menus, setMenus] = useState(sideMenu);

  useEffect(() => {
    setPath(location.pathname);

    const matchedMenu = menus.find((menu) => {
      if (menu.subMenus.length <= 0) {
        return null;
      }

      if (menu.subMenus.length > 0) {
        return menu.subMenus.some((sub) =>
          location.pathname.includes(sub.link)
        );
      }

      return location.pathname.includes(menu.link);
    });

    if (matchedMenu) {
      setSelectedMenu(matchedMenu);

      const matchedSub = matchedMenu.subMenus.find((sub) =>
        location.pathname.includes(sub.link)
      );
      if (matchedSub?.subMenus02?.length) {
        setIsSubOpen(matchedSub);
      }
    }

    // loginInfo가 변경될 때마다 menus 초기화
    const updatedMenus = JSON.parse(JSON.stringify(sideMenu));

    // 권한 관계없이 모든 메뉴 표시 (구조만 보기 위한 목적)
    for (let index = 0; index < updatedMenus.length; index++) {
      const element = updatedMenus[index];
      element.isView = true;

      if (element.subMenus.length > 0) {
        for (let index2 = 0; index2 < element.subMenus.length; index2++) {
          const element2 = element.subMenus[index2];
          element2.isView = true;

          if (element2.subMenus02?.length > 0) {
            for (
              let index3 = 0;
              index3 < element2.subMenus02.length;
              index3++
            ) {
              const element3 = element2.subMenus02[index3];
              element3.isView = true;
            }
          }
        }
      }
    }
    setMenus(updatedMenus);
  }, [location, loginInfo]);

  const handleFirstNavClick = (item: MenuItem) => {
    if (item.subMenus.length > 0) {
      setSelectedMenu(item);
      setIsSubmenuVisible(true);

      const firstSubMenu = item.subMenus[0];
      if (firstSubMenu.subMenus02 && firstSubMenu.subMenus02.length > 0) {
        navigate(firstSubMenu.subMenus02[0].link);
      } else {
        navigate(firstSubMenu.link);
      }
    } else {
      setSelectedMenu(null);
      // URL 쿼리 파라미터 초기화
      navigate(item.link, { replace: true });
      sessionStorage.removeItem("tab");
    }
  };

  const handleSubmenuClick = (item: SubMenu) => {
    if (item.subMenus02 && item.subMenus02.length > 0) {
      setIsSubOpen(isSubOpen === item ? null : item);
    } else {
      setIsSubOpen(null);
      // URL 쿼리 파라미터 초기화
      navigate(item.link, { replace: true });
      sessionStorage.removeItem("tab");
    }
  };

  const handleSubmenu02Click = (item: SubMenu02) => {
    // URL 쿼리 파라미터 초기화
    navigate(item.link, { replace: true });
    sessionStorage.removeItem("tab");
  };

  return {
    menus,
    path,
    selectedMenu,
    setSelectedMenu,
    isSubOpen,
    setIsSubOpen,
    isSubmenuVisible,
    setIsSubmenuVisible,
    handleFirstNavClick,
    handleSubmenuClick,
    handleSubmenu02Click,
  };
};

export default useSidebarController;
