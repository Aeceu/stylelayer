import { User2, Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="w-full h-[100px] border-b border-foreground/10  flex items-center justify-between  px-8 gap-8">
      <h1 className={`w-1/4 text-5xl  title`}>StyleLayer Co.</h1>

      <div
        className={`w-1/2 flex items-center ${isActive ? "justify-end" : "justify-between"} gap-4`}>
        {!isActive && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Label className="text-lg font-semibold">Categories</Label>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-2  w-full">
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">Browse</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">Deals</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">What&apos;s new</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">FAQs</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          className="w-full bg-white-shade rounded-full flex items-center justify-between px-4">
          {isActive && (
            <Select>
              <SelectTrigger className="w-[180px] rounded-3xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          )}
          <input
            type="text"
            className=" bg-transparent outline-none p-4 rounded-full w-full  placeholder:text-lg"
            placeholder="Search product"
          />
          <Search className="w-8 h-8" />
        </div>
      </div>

      <div className="w-1/4  flex items-center justify-end gap-10">
        <span className="flex items-center gap-6">
          <Cart />

          {user ? (
            <div className="relative flex items-center gap-1 bg-white">
              <User2 className="w-6 h-6" />
              <h1 className="text-lg">Account</h1>
            </div>
          ) : (
            <div className="relative flex items-center bg-white-shade p-2 gap-1 rounded-full">
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
