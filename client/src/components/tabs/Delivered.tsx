import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import OrderCard from "../OrderCard";

const Delivered = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  return (
    <div className="w-full h-full overflow-y-auto bg-white-shade-light divide-y divide-black-shade/30  rounded-xl px-4 pb-4 flex flex-col gap-4">
      {orders.map((order, i) => {
        if (order.status === "DELIVERED") {
          return (
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
          );
        }
      })}
    </div>
  );
};
export default Delivered;
