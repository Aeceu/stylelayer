import { handleGetOrderById } from "@/store/actions/orderAction";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Order = () => {
  const orderId = useSearchParams()[0].get("id");
  const { order } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orderId) dispatch(handleGetOrderById(orderId));
  }, []);
  console.log(order);

  if (!order) {
    return <div>no order available.</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-140px)] flex  bg-white-shade-light">
      <div className="w-1/2 h-full overflow-y-scroll flex flex-col gap-2 items-center p-4">
        {order.orderItems.map((item, i) => (
          <div
            key={i}
            className="shrink-0 w-1/2 min-h-[540px] bg-white rounded-lg flex flex-col p-4">
            <img
              src={item.product.productImage[0].imageUrl}
              alt={item.product.productImage[0].imageId}
              className="w-full h-[300px] object-cover  rounded-xl"
            />
            <span className="flex items-end gap-1 font-extrabold tracking-wide text-2xl p-2">
              <h1>Order:</h1>
              <h1 className="text-sm line-clamp-1 text-indigo-700">#{item.id}</h1>
            </span>
            <div className="flex items-center justify-between p-2">
              <span className="flex flex-col">
                <h1 className="text-stone-400">Order from</h1>
                <p className="font-bold tracking-widest">StyleLayer Co.</p>
              </span>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="flex flex-col">
                <h1 className="text-stone-400 ">Address</h1>
                <p className="w-1/2 text-sm">{`${order.other} ${order.street} ${order.baranggay} ${order.city} ${order.province} ${order.region}`}</p>
              </span>
              <span className="flex flex-col">
                <h1 className="text-stone-400">Items</h1>
                <p>{item.product.name}</p>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2  bg-white"></div>
    </div>
  );
};
export default Order;
