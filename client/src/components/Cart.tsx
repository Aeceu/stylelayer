import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { removeFromCart } from "@/store/slices/cartSlices";

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Sheet>
      <SheetTrigger>
        <div className=" flex items-center gap-2">
          <span className="relative">
            <ShoppingBag className="w-6 h-6" />
            <p className="bg-red-500 text-white text-sm w-[20px] h-[20px] rounded-full text-center absolute -top-[12px] -right-[12px]">
              {cart.length}
            </p>
          </span>
          <h1 className="text-lg">Cart</h1>
        </div>
      </SheetTrigger>

      <SheetContent side={"right"} className="p-0">
        <SheetHeader className="h-[70px] p-4 border-b shadow-md">
          <SheetTitle className="text-orange-500 text-3xl font-extrabold ">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-70px-70px)] bg-white-shade">
          <div className=" h-full flex flex-col items-center justify-center gap-2 p-2 ">
            {cart.map((item, i) => (
              <div
                key={i}
                className="w-full h-full bg-white flex flex-col border-y shadow-md rounded-md ">
                <div className="py-1 px-2 border-b  flex items-center gap-2">
                  <Checkbox />
                  <Label className="text-lg text-black font-extrabold tracking-wider line-clamp-1">
                    {item.item.productName}
                  </Label>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <div className="shrink-0 w-[100px] h-full overflow-hidden">
                    <img
                      src={item.item.productImage}
                      alt={item.item.productAlt}
                      width={100}
                      height={100}
                      className="w-full rounded-md"
                    />
                  </div>
                  <span className="p-2 w-full h-full flex flex-col justify-start gap-1">
                    <Label className="text-black text-sm">
                      Price: ₱ {parseInt(item.item.productPrice) * parseInt(item.quantity)}
                    </Label>
                    <Label className="text-black text-sm">Quantity: {item.quantity} pieces</Label>
                    <Label className="text-black text-sm">
                      Variations: {item.color}, {item.size}
                    </Label>

                    <span className="mt-2 flex items-center justify-end gap-1">
                      <Button
                        onClick={() => dispatch(removeFromCart(item.item.productName))}
                        size={"sm"}
                        className="text-xs bg-rose-500 hover:bg-rose-600 text-white">
                        Delete
                      </Button>
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="w-full px-4 h-[70px] bg-white  flex justify-between items-center border shadow-md ">
          <Label className="w-max flex items-center gap-2">
            <Checkbox />
            Selected All
          </Label>
          <span className="w-max flex items-center gap-2">
            <Label className="text-sm">
              Total (0 item): <span className="font-extrabold text-orange-500 ">₱ 0</span>
            </Label>
            <Button size="sm" className="bg-orange-500 text-white text-xs">
              Check out
            </Button>
          </span>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
