import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginInfoState } from "../store/loginInfoState";
import { sidebarMenu, MenuItem, SubMenu } from "../constants/sidebarMenu"; // Import from new 2-level menu
import {
  sidebarOpenMenusState,
  sidebarSelectedMainMenuState,
  sidebarSelectedSubMenuState,
} from "../store/sidebarState"; // Import the new atoms

export const useSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useRecoilValue(loginInfoState); // Use Recoil auth atom

  // Use Recoil state instead of Zustand
  const [openMenus, setOpenMenus] = useRecoilState(sidebarOpenMenusState);
  const [selectedSubMenu, setSelectedSubMenu] = useRecoilState(
    sidebarSelectedSubMenuState
  );
  const [selectedMainMenu, setSelectedMainMenu] = useRecoilState(
    sidebarSelectedMainMenuState
  );

  // This filtering logic is complex. For now, we will just show all menus
  // just like your old 'dummy' mode did.
  const getFilteredMenu = () => {
    // TODO: Add your 'accessMenu' permission logic here when ready
    return sidebarMenu
      .map((menu) => ({
        ...menu,
        isView: true, // Show all
        subMenus: menu.subMenus?.map((subMenu) => ({
          ...subMenu,
          isView: true,
        })),
      }))
      .filter((menu) => menu.isView);
  };

  const filteredMenu = getFilteredMenu();

  // This effect finds the correct menu to highlight on page load
  useEffect(() => {
    const currentPath = location.pathname;
    let found = false;

    for (const menu of filteredMenu) {
      // Check if a sub-menu matches
      if (menu.subMenus) {
        const subMenuIndex = menu.subMenus.findIndex(
          (sub) =>
            sub.link === currentPath ||
            (sub.originLink && currentPath.includes(sub.originLink))
        );

        if (subMenuIndex !== -1) {
          setOpenMenus({ [menu.title]: true });
          setSelectedMainMenu(menu.title);
          setSelectedSubMenu(`${menu.title}-${subMenuIndex}`);
          found = true;
          break;
        }
      }

      // Check if a main menu (with no sub-menus) matches
      if (!menu.subMenus && menu.link === currentPath) {
        setSelectedMainMenu(menu.title);
        setSelectedSubMenu(null);
        setOpenMenus({});
        found = true;
        break;
      }
    }

    if (!found) {
      // Optional: Clear selection if no match
      // setSelectedMainMenu(null);
      // setSelectedSubMenu(null);
    }
  }, [location.pathname, currentUser]); // Rerun when path or user changes

  // Accordion open/close logic
  const handleMainMenuClick = (menu: MenuItem) => {
    if (menu.subMenus && menu.subMenus.length > 0) {
      const isCurrentlyOpen = openMenus[menu.title];
      setOpenMenus(isCurrentlyOpen ? {} : { [menu.title]: true }); // Close others, open this
      setSelectedMainMenu(menu.title);
      setSelectedSubMenu(null);
    } else {
      // This is a direct link
      setSelectedMainMenu(menu.title);
      setSelectedSubMenu(null);
      setOpenMenus({});
      if (menu.link) {
        navigate(menu.link);
      }
    }
  };

  // Sub-menu click logic
  const handleSubMenuClick = (
    subMenu: SubMenu,
    parentTitle: string,
    index: number
  ) => {
    const subMenuKey = `${parentTitle}-${index}`;
    setSelectedSubMenu(subMenuKey);
    if (subMenu.link) {
      navigate(subMenu.link);
    }
  };

  return {
    openMenus,
    selectedSubMenu,
    selectedMainMenu,
    filteredMenu,
    handleMainMenuClick,
    handleSubMenuClick,
  };
};
