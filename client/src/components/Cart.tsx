import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { TCartItem } from "@/store/types/cart";
import { getUserCart, handleRemoveFromCart } from "@/store/actions/cartActions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { handleCreateOrder } from "@/store/actions/orderAction";

const Cart = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { orderStatus } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCartItems, setSelectedCartItems] = useState<TCartItem[]>([]);
  const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);

  const handleSelectCartItem = (cartItem: TCartItem) => {
    setSelectedCartItems([...selectedCartItems, cartItem]);
    const itemPrice = cartItem.product.price * parseInt(cartItem.quantity);
    setTotalCheckoutPrice((prev) => prev + itemPrice);
  };

  const handleUnSelectCartItem = (cartItem: TCartItem) => {
    setSelectedCartItems(
      selectedCartItems.filter((item) => item.id !== cartItem.id)
    );
    const itemPrice = cartItem.product.price * parseInt(cartItem.quantity);
    setTotalCheckoutPrice((prev) => prev - itemPrice);
  };

  const handleCheckOut = async () => {
    if (user && user.region && user.baranggay && user.street) {
      dispatch(
        handleCreateOrder({
          userId: user.id,
          address: {
            region: user.region,
            city: user.city || "",
            province: user.province || "",
            baranggay: user.baranggay,
            street: user.street,
            other: user.other || ""
          },
          cartItem: selectedCartItems
        })
      );
    } else {
      toast.error("Address is required!");
    }
  };

  useEffect(() => {
    if (user && user.id) dispatch(getUserCart(user.id));
  }, []);

  if (!user) {
    return (
      <Link
        to={"/login"}
        onClick={() => toast("Login first.")}
        className=" flex items-center gap-2"
      >
        <span className="relative">
          <ShoppingBag className="w-6 h-6" />
        </span>
        <h1 className="text-lg">Cart</h1>
      </Link>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className=" flex items-center gap-2 cursor-pointer ">
          <span className="relative">
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <p className="bg-orange-500 text-white flex items-center justify-center text-xs w-[20px] h-[20px] rounded-full text-center absolute -top-[12px] -right-[12px]">
                {cart.length}
              </p>
            )}
          </span>
          <h1 className="text-sm">Cart</h1>
        </div>
      </SheetTrigger>

      <SheetContent side={"right"} className="p-0 gap-0 flex flex-col">
        <SheetHeader className=" p-4 border-b shadow-md">
          <SheetTitle className="text-orange-500 text-3xl font-extrabold ">
            Shopping Cart
          </SheetTitle>
          <SheetDescription>
            Make changes to your cart here. Click checkout when you want to
            order your cart item.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full bg-white-shade flex flex-col items-center justify-center  px-4 ">
          {cart.map((cartItem: TCartItem, i) => (
            <div
              key={i}
              className="w-full h-full bg-white flex flex-col  shadow-md rounded-md my-4 border"
            >
              <div className="py-1 px-2 flex items-center gap-2 border-b">
                <Checkbox
                  onCheckedChange={(prev) => {
                    if (prev) {
                      handleSelectCartItem(cartItem);
                    } else {
                      handleUnSelectCartItem(cartItem);
                    }
                  }}
                />
                <Label className="text-lg text-black font-extrabold tracking-wider line-clamp-1">
                  {cartItem.product.name}
                </Label>
              </div>
              <div className="flex items-center gap-2 p-2">
                <div className="shrink-0 w-[100px] h-full overflow-hidden">
                  <img
                    src={cartItem.product.productImage[0].imageUrl}
                    alt={cartItem.product.productImage[0].imageId}
                    width={100}
                    height={100}
                    className="w-full rounded-md"
                  />
                </div>
                <span className="p-2 w-full h-full flex flex-col justify-start gap-1">
                  <Label className="text-black text-sm">
                    Total Price: ₱{" "}
                    {(
                      cartItem.product.price * parseInt(cartItem.quantity)
                    ).toLocaleString()}
                  </Label>
                  <Label className="text-black text-sm">
                    Quantity: {cartItem.quantity} pieces
                  </Label>
                  <Label className="text-black text-sm flex items-center gap-1">
                    Variations:
                    {cartItem.variants.map((item, i) => (
                      <p key={i}>{item.option}</p>
                    ))}
                  </Label>

                  <span className="mt-2 flex items-center justify-end gap-1">
                    <Button
                      onClick={() =>
                        dispatch(handleRemoveFromCart(cartItem.id))
                      }
                      size={"sm"}
                      className="text-xs bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      Delete
                    </Button>
                  </span>
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="w-full px-4 h-[70px] bg-white  flex justify-between items-center border shadow-md ">
          <span className="flex items-center gap-2 ">
            <Label className="text-lg ">{`Total (${selectedCartItems.length} item):`}</Label>
            <Label className="font-extrabold text-xl text-orange-500 tracking-wide ">
              ₱{totalCheckoutPrice}
            </Label>
          </span>
          <span className="w-max flex items-center gap-2">
            <Button
              disabled={orderStatus === "pending"}
              onClick={handleCheckOut}
              size="sm"
              className="bg-orange-500 text-white text-xs"
            >
              {orderStatus === "pending" ? "Checking out...." : "Check out"}
            </Button>
          </span>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
