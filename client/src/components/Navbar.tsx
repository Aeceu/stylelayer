import { User2, Search, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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
import { fetchSearchProduct, getCategories } from "@/store/actions/productActions";
import { Link } from "react-router-dom";
import { TProduct } from "@/store/types/product";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState<{ category: string }[]>([]);

  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<TProduct[] | null>(null);

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

  const clearSearch = () => {
    setSearch("");
    setSearchResult(null);
    setSearchLoading(false);
    setIsActive(false);
  };

  return (
    <nav className="w-full h-[100px] border-b border-foreground/10  flex items-center justify-between  px-8 gap-8">
      <Link to={"/"} className={`w-1/4 text-5xl  title`}>
        StyleLayer Co.
      </Link>

      <div
        className={`relative w-1/2 flex items-center ${
          isActive ? "justify-end" : "justify-between"
        } gap-4`}>
        {!isActive && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Label className="text-lg font-semibold">Categories</Label>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4   flex flex-col gap-2">
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
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/products?page=1&pageSize=10"
                  className={navigationMenuTriggerStyle()}>
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

        <form
          onFocus={() => setIsActive(true)}
          onBlur={clearSearch}
          className=" w-full bg-white-shade rounded-full flex items-center justify-between px-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" bg-transparent outline-none p-4 rounded-full w-full  placeholder:text-lg"
            placeholder="Search product"
          />
          <Search className="w-8 h-8 mr-2" />
        </form>
        {searchResult && (
          <div className="bg-white border rounded-md p-2 w-full absolute top-16 left-0 z-10 flex flex-col items-center gap-2">
            {searchLoading && <Loader2 className="animate-spin w-8 h-8 text-center my-2" />}
            {searchResult.length > 0 ? (
              searchResult.map((item, i) => (
                <Label key={i} className="w-full text-lg font-extrabold tracking-widest">
                  {item.name}
                </Label>
              ))
            ) : (
              <Label className="text-center">No item available.</Label>
            )}
          </div>
        )}
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
