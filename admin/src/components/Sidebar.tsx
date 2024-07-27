import { Link, useLocation } from "react-router-dom";
import { Label } from "./ui/label";

const Sidebar = () => {
  const params = useLocation();

  return (
    <div className="w-[300px] shrink-0 h-full bg-black text-white flex flex-col border-r border-background/30">
      <Label className="font-extrabold text-xl poppins-extrabold tracking-widest p-6">
        Admin Dashboard
      </Label>

      <span className="flex flex-col gap-2 p-4">
        <Link
          to={"/"}
          className={`p-4 tracking-widest flex items-center gap-4 ${
            params.pathname === "/" && "bg-[#222222] rounded-xl "
          } `}>
          <img src="./home.svg" alt="home" className="h-6 w-6" />
          Home
        </Link>
        <Link
          to={"/orders?page=1&pageSize=10"}
          className={`p-4 tracking-widest flex items-center gap-4 ${
            params.pathname === "/orders" && "bg-[#222222] rounded-xl "
          }`}>
          <img src="./product.svg" alt="home" className="h-6 w-6" />
          Orders
        </Link>
        <Link
          to={"/products?page=1&pageSize=10"}
          className={`p-4 tracking-widest flex items-center gap-4 ${
            params.pathname === "/products" && "bg-[#222222] rounded-xl "
          }`}>
          <img src="./product.svg" alt="home" className="h-6 w-6" />
          Products
        </Link>
        <Link
          to={"/create_product"}
          className={`p-4 tracking-widest flex items-center gap-4 ${
            params.pathname === "/create_product" && "bg-[#222222] rounded-xl "
          }`}>
          <img src="./product.svg" alt="home" className="h-6 w-6" />
          Create Product
        </Link>
      </span>
    </div>
  );
};
export default Sidebar;
