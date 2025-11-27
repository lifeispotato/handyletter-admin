import { route } from "../../routes/route"; // Make sure this path is correct

// 1. Define the NEW 2-Level Types
export interface SubMenu {
  title: string;
  link: string;
  isView: boolean;
  originLink?: string;
}

export interface MenuItem {
  title: string;
  link: string;
  icon?: string; // Icon is now optional
  isView: boolean;
  subMenus?: SubMenu[]; // Sub-menus are optional
}

// 2. Your 3-Level Menu, CONVERTED to 2-Levels

export const sidebarMenu: MenuItem[] = [
  {
    title: "홈",
    link: route.home,
    icon: "",
    isView: true,
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
  },
  {
    title: "숙소 관리",
    link: route.dormList,
    icon: "",
    isView: true,
  },
  {
    title: "서비스 관리",
    link: "", // It's a folder, so no main link
    icon: "",
    isView: true,
    subMenus: [
      // { title: "알림 관리", link: route.notificationList, isView: true },
      // { title: "공지사항 관리", link: route.noticeList, isView: true },
      { title: "약관 관리", link: route.termsList, isView: true },
      // { title: "1:1 문의 관리", link: route.inquiryList, isView: true },
      { title: "FAQ 관리", link: route.faqList, isView: true },
      // { title: "팝업 관리", link: route.popupList, isView: true },
      { title: "기본 관리", link: route.basicDetail, isView: true },
      // { title: "관리자 회원 관리", link: route.managerList, isView: true },
    ],
  },
];
