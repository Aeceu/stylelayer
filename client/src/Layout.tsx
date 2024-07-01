import { Outlet } from "react-router-dom";
import DiscountAds from "./components/DiscountAds";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <DiscountAds />
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Layout;
