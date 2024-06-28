import { Link } from "react-router-dom";
import { Label } from "./ui/label";

const Sidebar = () => {
  return (
    <div className="w-[300px] shrink-0 h-full bg-black text-white flex flex-col border-r border-background/30">
      <Label className="font-extrabold text-xl poppins-extrabold tracking-widest p-6">
        Admin Dashboard
      </Label>

      <span className="flex flex-col gap-2 p-4">
        <Link
          to={"/"}
          className="p-4 tracking-widest flex items-center gap-4 bg-[#222222] rounded-xl ">
          <img src="./home.svg" alt="home" className="h-6 w-6" />
          Home
        </Link>
        <Link to={"/products"} className="p-4 tracking-widest flex items-center gap-4">
          <img src="./product.svg" alt="home" className="h-6 w-6" />
          Products
        </Link>
        <Link to={"/create_product"} className="p-4 tracking-widest flex items-center gap-4">
          <img src="./product.svg" alt="home" className="h-6 w-6" />
          Create Product
        </Link>
      </span>
    </div>
  );
};
export default Sidebar;
