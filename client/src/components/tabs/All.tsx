import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import OrderCard from "../OrderCard";
import { Loader2 } from "lucide-react";

const All = () => {
  const { orders, orderStatus } = useSelector(
    (state: RootState) => state.order
  );

  if (orderStatus === "pending") {
    return (
      <div className="w-full h-full overflow-y-auto bg-white-shade-light divide-y divide-black-shade/30  rounded-xl px-4 pb-4 gap-4 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-white-shade-light divide-y divide-black-shade/30  rounded-xl px-4 pb-4 flex flex-col gap-4">
      {orders.map((order, i) => (
        <div key={i} className="flex flex-col gap-4 pt-4 ">
          {order.orderItems.map((orderItem, j) => (
            <OrderCard
              orderId={order.id}
              key={j}
              orderItem={orderItem}
              trackingStatus={order.trackingInfo?.currentStatus}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default All;
