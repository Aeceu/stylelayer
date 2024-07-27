import {
  User2,
  Search,
  ChevronRight,
  Loader2,
  PackageCheck,
  ShoppingCart,
  Settings,
  BookUser,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
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
import { fetchSearchProduct, getCategories } from "@/store/actions/productActions";
import { Link } from "react-router-dom";
import { TProduct } from "@/store/types/product";
import Logout from "./Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<{ category: string }[]>([]);

  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<TProduct[] | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    getCategories().then((res) => {
      if (Array.isArray(res)) {
        setCategories(res);
      } else {
        console.log(res);
      }
    });
  }, []);

  useEffect(() => {
    if (search) {
      setSearchLoading(true);
      fetchSearchProduct(search)
        .then((res) => {
          if (Array.isArray(res)) {
            setSearchResult(res);
          } else {
            console.log(res);
          }
        })
        .finally(() => {
          setSearchLoading(false);
        });
    } else {
      setSearchResult(null);
    }
  }, [search]);

  useEffect(() => {
    const handleBlur = (event: MouseEvent) => {
      if (formRef.current && formRef.current.contains(event.target as Node)) {
        setIsActive(true);
      } else {
        clearSearch();
      }
    };

    document.addEventListener("click", handleBlur);
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  const clearSearch = () => {
    setSearch("");
    setSearchResult(null);
    setSearchLoading(false);
    setIsActive(false);
  };

  return (
    <nav className="w-full h-[100px] border-b border-foreground/10  flex items-center justify-between  px-8 gap-8">
      <Link to={"/"} className={`shrink-0 w-max lg:text-5xl text-2xl title`}>
        StyleLayer Co.
      </Link>

      <div
        className={` w-full flex items-center ${
          isActive ? "justify-end" : "justify-between"
        } gap-4`}>
        {!isActive && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuTrigger>
                  <Label className="text-lg font-semibold">Categories</Label>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 flex flex-col gap-2">
                  {categories.map((item, i) => (
                    <NavigationMenuLink
                      key={i}
                      href={`/products?page=1&pageSize=10&category=${item.category}`}
                      className="whitespace-nowrap font-bold tracking-widest">
                      {item.category}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuLink
                  href="/products?page=1&pageSize=10"
                  className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">Browse</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">Deals</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">What&apos;s new</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  <Label className="text-lg font-semibold">FAQs</Label>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <form
          ref={formRef}
          onFocus={() => setIsActive(true)}
          className="relative w-full bg-white-shade rounded-full flex items-center justify-between px-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" bg-transparent outline-none p-4 rounded-full w-full  placeholder:text-lg"
            placeholder="Search product"
          />
          <Search className="w-8 h-8 mr-2" />
          {searchResult && (
            <div className="bg-white border rounded-md p-2 w-full absolute top-16 left-0 z-10 flex flex-col items-center gap-2">
              {searchLoading && <Loader2 className="animate-spin w-8 h-8 text-center my-2" />}
              {searchResult.length > 0 ? (
                searchResult.map((item, i) => (
                  <Link
                    onClick={clearSearch}
                    to={`/product?id=${item.id}`}
                    key={i}
                    className="z-20 w-full  font-extrabold tracking-widest p-2 rounded-lg hover:bg-white-shade">
                    {item.name}
                  </Link>
                ))
              ) : (
                <Label className="text-center">No item available.</Label>
              )}
            </div>
          )}
        </form>
      </div>

      <div className="shrink-0 w-1/4  hidden lg:flex items-center justify-end gap-10">
        <span className="flex items-center gap-4">
          <Cart />
          <Link to={"/orders"} className=" flex items-center gap-2 cursor-pointer ">
            <span className="relative">
              <PackageCheck className="w-6 h-6 " />
              {/* <p className="bg-orange-500 text-white text-sm w-[20px] h-[20px] rounded-full text-center absolute -top-[12px] -right-[12px]">
                0
              </p> */}
            </span>
            <h1 className="text-sm">Orders</h1>
          </Link>
          {user ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <div className="shadow-md relative flex items-center gap-1 bg-orange-400 text-white px-4 py-2 rounded-full">
                  <User2 className="w-6 h-6" />
                  <h1 className="text-lg tracking-widest font-bold">Account</h1>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="p-0">
                  <Link to={"/profile"} className="w-full h-full p-2">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/profile/address"}>Address</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/profile/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="shrink-0 relative flex items-center bg-white-shade p-2 gap-1 rounded-full">
              <Link
                to={"/login"}
                className="px-4 py-2 flex items-center gap-1 rounded-full bg-transparent text-black hover:bg-white">
                <User2 className="w-4 h-4" />
                Login
              </Link>
              <Link
                to={"/signup"}
                className="px-4 py-2 flex items-center gap-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white">
                Sign up <ChevronRight className="w-4 h-4 " />
              </Link>
            </div>
          )}
        </span>
      </div>

      {/* Mobile View */}
      <div className="flex lg:hidden ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="shadow-md relative flex items-center gap-1 bg-orange-400 text-white px-4 py-2 rounded-full">
              <User2 className="w-6 h-6" />
              <h1 className="text-lg tracking-widest font-bold">Account</h1>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem className="p-0">
              <Link to={"/profile"} className="w-full h-full p-2 flex items-center gap-2">
                <User2 className="w-4 h-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link className="w-full h-full p-2 flex items-center gap-2" to={"/profile/address"}>
                <ShoppingCart className="w-4 h-4" />
                Cart
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link className="w-full h-full p-2 flex items-center gap-2" to={"/profile/settings"}>
                <PackageCheck className="w-4 h-4" />
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link className="w-full h-full p-2 flex items-center gap-2" to={"/profile/address"}>
                <BookUser className="w-4 h-4" />
                Address
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link className="w-full h-full p-2 flex items-center gap-2" to={"/profile/settings"}>
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
export default Navbar;
