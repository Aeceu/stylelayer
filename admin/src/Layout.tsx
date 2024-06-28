import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="w-full h-screen flex items-center poppins-regular">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Layout;
