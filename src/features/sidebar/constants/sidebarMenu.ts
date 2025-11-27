import { route } from "../../../routes/route";

// 3-Level Menu Types (for legacy compatibility)
export interface SubMenu02 {
  title: string;
  link: string;
  isView: boolean;
  originLink?: string;
}

export interface SubMenu {
  title: string;
  link: string;
  isView: boolean;
  originLink?: string;
  subMenus02?: SubMenu02[];
}

export interface MenuItem {
  title: string;
  link: string;
  icon?: string;
  isView: boolean;
  subMenus: SubMenu[];
}

// 3-Level Menu Data (for legacy compatibility)
export const sideMenu: MenuItem[] = [
  {
    title: "홈",
    link: route.home,
    icon: "",
    isView: true,
    subMenus: [],
  },
  {
    title: "사용자 관리",
    link: "",
    icon: "",
    isView: true,
    subMenus: [
      { title: "회원 정보", link: route.memberList, isView: true },
      { title: "탈퇴회원 관리", link: route.memberWithdraw, isView: true },
    ],
  },
  {
    title: "뉴스레터 콘텐츠 관리",
    link: route.todayBrandList,
    icon: "",
    isView: true,
    subMenus: [],
  },
  {
    title: "서비스 관리",
    link: "",
    icon: "",
    isView: true,
    subMenus: [
      { title: "약관 관리", link: route.termsList, isView: true },
      { title: "FAQ 관리", link: route.faqList, isView: true },
      { title: "기본 관리", link: route.basicDetail, isView: true },
    ],
  },
];
