import { Outlet } from 'react-router-dom';
import { TopBanner } from '../../widgets/TopBanner/TopBanner';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';// <--- Import this

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-7">
      <TopBanner />
      <Header isLoggedIn /> 
      
      <main className="grow">
        <Outlet />
      </main>
      
      <Footer /> {/* <--- Add this */}
    </div>
  );
};

export default AuthLayout;