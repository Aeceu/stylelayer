import { Label } from "@/components/ui/label";
import { handleGetOrders } from "@/store/actions/orderAction";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) dispatch(handleGetOrders(user.id));
  }, []);

  return (
    <div className="p-8">
      {orders.map((item, i) => (
        <div key={i} className="mb-2 flex flex-col gap-2">
          {item.orderItems.map((cartItem, idx) => (
            <Link
              to={`/order?id=${item.id}`}
              key={idx}
              className="w-1/4 h-full bg-white flex flex-col  shadow-md rounded-md  border">
              <div className="py-1 px-2 border-b  flex items-center gap-2">
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
                    {(parseInt(cartItem.product.price) * cartItem.quantity).toLocaleString()}
                  </Label>
                  <Label className="text-black text-sm">Quantity: {cartItem.quantity} pieces</Label>
                  <Label className="text-black text-sm flex items-center gap-1">
                    Variations:
                    {cartItem.variants.map((item, i) => (
                      <p key={i}>{item.option}</p>
                    ))}
                  </Label>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Orders;
