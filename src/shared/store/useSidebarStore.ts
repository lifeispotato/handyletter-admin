import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  openMenus: Record<string, boolean>;
  selectedSubMenu: string | null;
  selectedMainMenu: string | null;
  setOpenMenus: (menus: Record<string, boolean>) => void;
  setSelectedSubMenu: (menu: string | null) => void;
  setSelectedMainMenu: (menu: string | null) => void;
  toggleMenu: (menuTitle: string) => void;
  resetState: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      openMenus: {},
      selectedSubMenu: null,
      selectedMainMenu: null,
      setOpenMenus: (menus) => set({ openMenus: menus }),
      setSelectedSubMenu: (menu) => set({ selectedSubMenu: menu }),
      setSelectedMainMenu: (menu) => set({ selectedMainMenu: menu }),
      toggleMenu: (menuTitle) =>
        set((state) => ({
          openMenus: {
            ...state.openMenus,
            [menuTitle]: !state.openMenus[menuTitle],
          },
        })),
      resetState: () =>
        set({
          openMenus: {},
          selectedSubMenu: null,
          selectedMainMenu: null,
        }),
    }),
    {
      name: "sidebar-storage",
    }
  )
);
