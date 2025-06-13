import { Outlet } from "react-router-dom";
import DiscountAds from "./components/DiscountAds";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <DiscountAds />
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Layout;
