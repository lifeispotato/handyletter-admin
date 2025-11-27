import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/etc/NotFound";
import Home from "../pages/home/Home";
import Join from "../pages/join/Join";
import JoinComplete from "../pages/join/JoinComplete";
import FindIdComplete from "../pages/login/FindIdComplete";
import ResetPw from "../pages/login/ResetPw";
import MainLayout from "../shared/components/atoms/layout/MainLayout";
import MemberDetailPage from "@/pages/memberManageNew/MemberDetailPage";
import MemberWithdrawManagementPage from "@/pages/memberManageNew/MemberLeaveManagementPage";
import MemberManagementPage from "@/pages/memberManageNew/MemberManagementPage";
import MemberUpdatePage from "@/pages/memberManageNew/MemberUpdatePage";
import BasicDetailPage from "@/pages/servicemanage/basicmanage/BasicDetailPage";
import BasicUpdatePage from "@/pages/servicemanage/basicmanage/BasicUpdatePage";
import FaqCreatePage from "@/pages/servicemanage/faqmanage/FaqCreatePage";
import FaqDetailPage from "@/pages/servicemanage/faqmanage/FaqDetailPage";
import FaqListPage from "@/pages/servicemanage/faqmanage/FaqListPage";
import FaqUpdatePage from "@/pages/servicemanage/faqmanage/FaqUpdatePage";
import TermsCreatePage from "@/pages/servicemanage/termsmanage/TermsCreatePage";
import TermsDetailPage from "@/pages/servicemanage/termsmanage/TermsDetailPage";
import TermsListPage from "@/pages/servicemanage/termsmanage/TermsListPage";
import TermsUpdatePage from "@/pages/servicemanage/termsmanage/TermsUpdatePage";
import TodayBrandManagementPage from "@/pages/todayBrand/TodayBrandManagementPage";
import TodayBrandDetailPage from "@/pages/todayBrand/TodayBrandDetailPage";
import TodayBrandCreatePage from "@/pages/todayBrand/TodayBrandCreatePage";
import ShortFormManagementPage from "@/pages/todayBrand/ShortFormManagementPage";
import StoryManagementPage from "@/pages/todayBrand/StoryManagementPage";
import DormManagementPage from "@/pages/dorm/DormManagementPage";
import AccountFind from "../pages/login/AccountFind";
import BeforeApproveAccount from "../pages/login/BeforeApproveAccount";
import ResetPwComplete from "../pages/login/ResetPwComplete";
import Login from "./../pages/login/Login";
import { route } from "./route";
const Router = () => {
  return (
    <Routes>
      <Route
        path={route.default}
        element={<Navigate to={route.login} replace />}
      />

      {/* MainLayout에 영향 받지 않는 컴포넌트들 */}
      <Route path={route.login} element={<Login />} />
      <Route path={route.account_find} element={<AccountFind />} />
      <Route path={route.find_id_complete} element={<FindIdComplete />} />
      <Route path={route.reset_pw} element={<ResetPw />} />
      <Route path={route.reset_pw_complete} element={<ResetPwComplete />} />
      <Route path={route.join} element={<Join />} />
      <Route path={route.join_complete} element={<JoinComplete />} />
      <Route
        path={route.before_approve_account}
        element={<BeforeApproveAccount />}
      />

      {/* ----- 기본 ----- */}
      <Route element={<MainLayout />}>
        {/* WHITE-LEGACY */}
        <Route path={route.home} element={<Home />} />
        <Route path={route.memberList} element={<MemberManagementPage />} />
        <Route
          path={route.memberDetail + "/:id"}
          element={<MemberDetailPage />}
        />
        <Route
          path={route.memberUpdate + "/:id"}
          element={<MemberUpdatePage />}
        />
        <Route
          path={route.memberWithdraw}
          element={<MemberWithdrawManagementPage />}
        />
        <Route path={route.basicDetail} element={<BasicDetailPage />} />
        <Route path={route.basicUpdate} element={<BasicUpdatePage />} />
        <Route path={route.faqCreate} element={<FaqCreatePage />} />
        <Route path={route.faqDetail + "/:id"} element={<FaqDetailPage />} />
        <Route path={route.faqList} element={<FaqListPage />} />
        <Route path={route.faqUpdate + "/:id"} element={<FaqUpdatePage />} />
        <Route path={route.termsCreate} element={<TermsCreatePage />} />
        <Route
          path={route.termsUpdate + "/:id"}
          element={<TermsUpdatePage />}
        />
        <Route path={route.termsList} element={<TermsListPage />} />
        <Route
          path={route.termsDetail + "/:id"}
          element={<TermsDetailPage />}
        />
        <Route
          path={route.todayBrandList}
          element={<TodayBrandManagementPage />}
        />
        <Route
          path={route.todayBrandDetail + "/:id"}
          element={<TodayBrandDetailPage />}
        />
        <Route
          path={route.todayBrandCreate}
          element={<TodayBrandCreatePage />}
        />
        <Route
          path={route.shortFormList}
          element={<ShortFormManagementPage />}
        />
        <Route
          path={route.shortFormDetail + "/:id"}
          element={<TodayBrandDetailPage />}
        />
        <Route path={route.storyList} element={<StoryManagementPage />} />
        <Route
          path={route.storyDetail + "/:id"}
          element={<TodayBrandDetailPage />}
        />
        <Route path={route.dormList} element={<DormManagementPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
