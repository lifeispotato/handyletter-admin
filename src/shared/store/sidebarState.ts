import { atom } from "recoil";

// This atom holds which accordion menus are open
export const sidebarOpenMenusState = atom<{ [key: string]: boolean }>({
  key: "sidebarOpenMenusState",
  default: {},
});

// This atom tracks the currently selected main menu item (for highlighting)
export const sidebarSelectedMainMenuState = atom<string | null>({
  key: "sidebarSelectedMainMenuState",
  default: null,
});

// This atom tracks the currently selected sub-menu item (for highlighting)
export const sidebarSelectedSubMenuState = atom<string | null>({
  key: "sidebarSelectedSubMenuState",
  default: null,
});
