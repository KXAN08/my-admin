import { Outlet } from "react-router-dom";
import HeaderTop from "../../components/header/HeaderTop";
import HeaderNav from "../../components/header/HeaderNav";

const DashboardLayout = () => (
  <div className="flex flex-col h-screen overflow-hidden">
    <HeaderTop />
    <div className="flex flex-1 overflow-hidden">
      <HeaderNav />
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default DashboardLayout;
