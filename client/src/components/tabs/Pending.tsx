import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";
const Pending = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  return (
    <div className="bg-white-shade w-full h-full rounded-xl p-8 flex flex-col gap-2 ">
      {orders.map((order, i) => {
        if (order.status === "PENDING") {
          return (
            <div key={i} className="flex flex-col gap-2">
              {order.orderItems.map((orderItem, j) => (
                <div
                  key={j}
                  className="shadow-md flex flex-col items-center justify-between w-[700px] h-[160px] border"
                >
                  <div className="flex items-center justify-between h-[120px] w-full border-b">
                    <span className="w-[120px] h-full overflow-hidden">
                      <img
                        src={orderItem.product.productImage[0].imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <div className="flex flex-col justify-between gap-1 p-2 h-full w-full">
                      <Label className="text-xl font-bold">
                        {orderItem.product.name}
                      </Label>
                      <span className="flex items-center justify-between gap-2">
                        <Label className="text-lg font-semibold   flex items-center gap-1">
                          Variations:
                          {orderItem.variants.map((item, i) => (
                            <p key={i}>{item.option}</p>
                          ))}
                        </Label>
                        <Label className="text-lg font-semibold  ">
                          {orderItem.quantity} x
                        </Label>
                      </span>
                      <Label className="text-lg font-semibold  w-full flex items-center gap-1 justify-end ">
                        Price:{" "}
                        <p className="text-orange-500">
                          {orderItem.product.price}
                        </p>
                      </Label>
                    </div>
                  </div>
                  <div className="w-full h-full flex items-center justify-between px-2">
                    <Label className="flex items-center tracking-widest text-blue-500">
                      {`>${order.trackingInfo?.currentStatus}`}
                    </Label>
                    <Label className="text-lg font-semibold flex items-center gap-1">
                      Total Price:{" "}
                      <p className="text-orange-500">
                        {orderItem.product.price * orderItem.quantity}
                      </p>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};
export default Pending;
