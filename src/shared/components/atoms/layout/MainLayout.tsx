import { Outlet } from "react-router-dom";
import Header from "../../organisms/Header";

import { useRecoilValue } from "recoil";
import { loadingState } from "../../../store/loadingState";
import { logoutAlertModalState } from "../../../store/logoutAlertModalState";
import Sidebar from "../../organisms/Sidebar";
import LoadingSpinner from "../LoadingSpinner";
import LogoutAlertModal from "../LogoutAlertModal";

function MainLayout() {
  const isLoading = useRecoilValue(loadingState);
  const isLogoutAlertModal = useRecoilValue(logoutAlertModalState);

  return (
    <div>
      <Sidebar /> {/* 👈 NEW (now fixed, and has its own bg) */}
      {/* Main Content area */}
      <div className="ml-[265px] h-fit">
        {" "}
        {/* 👈 CRITICAL: Add left margin */}
        <Header />
        <div className="w-full flex justify-center mt-[75px] px-[17.3%]">
          <Outlet />
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
      {isLogoutAlertModal && <LogoutAlertModal />}
    </div>
  );
}

export default MainLayout;
