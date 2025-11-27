import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../widgets/Sidebar/SidebarMenu';
import { Footer } from '../../widgets/Footer/Footer';
import { TopBanner } from '../../widgets/TopBanner/TopBanner';
import { Header } from '../../widgets/Header/Header';

const MyPageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-7">
          <TopBanner />
          <Header isLoggedIn /> 
    <div className="w-full max-w-7xl mx-auto px-4 py-[60px] flex gap-[60px] min-h-[800px]">
      
      {/* Left: Sidebar (Fixed Width) */}
      <div className="shrink-0">
        <Sidebar />
      </div>
      
      {/* Right: Dynamic Page Content (Saved, Purchased, etc.) */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
    <Footer /> {/* <--- Add this */}
        </div>
  );
};

export default MyPageLayout;