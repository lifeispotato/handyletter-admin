import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSidebarStore } from "./useSidebarStore";
import { queryClient } from "../lib/queryClient";

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  approval: boolean;
  activation: boolean;
  role: string;
  accessMenu: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

interface AuthActions {
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      // 초기 상태
      accessToken: null,
      refreshToken: null,
      user: null,

      // 액션
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setUser: (user) => set({ user }),
      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null });
        // 사이드바 상태도 초기화
        const sidebarStore = useSidebarStore.getState();
        sidebarStore.resetState();
        // React Query 캐시 무효화
        queryClient.clear();
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
