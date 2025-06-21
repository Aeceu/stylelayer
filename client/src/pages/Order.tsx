import { handleGetOrderById } from "@/store/actions/orderAction";
import { TOrder } from "@/store/types/order";
import { ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Order = () => {
  const orderId = useSearchParams()[0].get("id");

  const [order, setOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      handleGetOrderById(orderId)
        .then((res) => {
          if (res) {
            setOrder(res);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-140px)] p-4  ">
        <div className="flex items-center justify-center bg-white-shade-light rounded-xl w-full h-full overflow-y-scroll  p-4">
          <Loader2 className="animate-spin" size={40} />
        </div>
      </div>
    );
  }
  if (!order) {
    return (
      <div className="w-full h-[calc(100vh-140px)] p-4  ">
        <div className="bg-white-shade-light rounded-xl w-full h-full overflow-y-scroll  p-4">
          no order available.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-140px)] p-4  ">
      <div className="bg-white-shade-light rounded-xl w-full h-full flex flex-col items-center justify-between overflow-y-scroll  p-4">
        <div className="w-full">
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Orders
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-4">You have ordered:</h1>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {order.orderItems.map((item, j) => (
            <div
              key={j}
              className="shrink-0 w-[500px] h-[600px] shadow-xl bg-white rounded-lg flex flex-col p-4"
            >
              <img
                src={item.product.productImage[0].imageUrl}
                alt={item.product.productImage[0].imageId}
                className="w-full h-full object-cover  rounded-md"
              />
              <span className="flex items-end gap-2 font-extrabold tracking-wide text-2xl p-2">
                <h1 className="text-base">Order:</h1>
                <h1 className="text-xs line-clamp-1 text-indigo-700">
                  #{item.id}
                </h1>
              </span>
              <div className="flex items-center justify-between p-2">
                <span className="w-1/2 flex flex-col items-start justify-center">
                  <h1 className="text-stone-400">Order from</h1>
                  <p className="font-bold tracking-widest">StyleLayer Co.</p>
                </span>
                <span className="w-1/2 flex flex-col items-end justify-center">
                  <h1 className="text-stone-400">Total</h1>
                  <h1 className="font-bold flex items-center gap-1">
                    ₱ {item.product.price * item.quantity}.00
                    <p className="text-[10px] text-stone-900 ">{`(${item.quantity} pc/s)`}</p>
                  </h1>
                </span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="w-1/2 flex flex-col items-start justify-center">
                  <h1 className="text-stone-400 ">Order to</h1>
                  <p className="text-sm line-clamp-2">{`${order.other} ${order.street} ${order.baranggay} ${order.city} ${order.province} ${order.region}`}</p>
                </span>
                <span className="w-1/2 flex flex-col items-end justify-center">
                  <h1 className="text-stone-400">Items</h1>
                  <p>{item.product.name}</p>
                </span>
              </div>

              <span className="flex items-center border-t gap-1 font-extrabold tracking-wide p-2">
                <ChevronRight size={15} />
                <h1 className="text-xs line-clamp-1 text-indigo-700">
                  {order.trackingInfo?.currentStatus}
                </h1>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Order;
