import { Outlet } from "react-router-dom";
import DiscountAds from "./components/DiscountAds";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <DiscountAds />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
