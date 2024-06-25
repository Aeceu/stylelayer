import { User2, Search, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="w-full h-[100px] border-b border-foreground/10  flex items-center justify-between gap-16 px-16">
      <h1 className={`text-5xl shrink-0 title`}>StyleLayer Co.</h1>

      <div
        className={`w-full flex items-center ${
          isActive ? "justify-end" : "justify-between"
        } gap-4`}>
        {!isActive && (
          <span className="shrink-0 flex items-center  gap-8">
            <Link className="text-lg font-semibold flex items-center gap-2" to="/">
              Categories
              <ChevronDown className="w-6 h-6" />
            </Link>
            <Link className="text-lg font-semibold" to="/">
              Deals
            </Link>
            <Link className="text-lg font-semibold" to="/">
              What&apos;s new
            </Link>
            <Link className="text-lg font-semibold" to="/">
              FAQ
            </Link>
          </span>
        )}

        <motion.div
          animate={{ width: isActive ? "100%" : "" }}
          className=" bg-white-shade rounded-full flex items-center justify-between">
          <input
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            type="text"
            className=" bg-transparent outline-none p-4 rounded-full w-full min-w-[600px] placeholder:text-lg"
            placeholder="Search product"
          />
          <Search className="mr-4 w-8 h-8" />
        </motion.div>
      </div>

      <div className="shrink-0 flex items-center gap-10">
        <span className="flex items-center gap-6">
          <Cart />

          {user ? (
            <div className="relative flex items-center gap-1 bg-white">
              <User2 className="w-6 h-6" />
              <h1 className="text-lg">Account</h1>
            </div>
          ) : (
            <div className="relative flex items-center bg-white-shade p-1 gap-1 rounded-full">
              <Button className="flex items-center gap-1 rounded-full bg-transparent text-black hover:bg-white">
                <User2 className="w-4 h-4" />
                Login
              </Button>
              <Button className="flex items-center gap-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white">
                Sign up <ChevronRight className="w-4 h-4 " />
              </Button>
            </div>
          )}
        </span>
      </div>
    </nav>
  );
};
export default Navbar;
