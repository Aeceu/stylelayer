import { TOrderItem } from "@/store/types/order";
import { Label } from "./ui/label";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  orderId: string;
  orderItem: TOrderItem;
  trackingStatus: string | undefined;
};
const OrderCard = ({ orderId, orderItem, trackingStatus }: Props) => {
  return (
    <Link
      to={`/order?id=${orderId}`}
      className="shadow-md rounded-lg overflow-hidden bg-white flex flex-col items-center justify-between w-[700px] h-[160px] border"
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
          <Label className="text-xl font-bold">{orderItem.product.name}</Label>
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
            Price: <p className="text-orange-500">{orderItem.product.price}</p>
          </Label>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-between px-2">
        <Label className="flex items-center tracking-widest text-blue-500">
          <ChevronRight size={15} />
          {trackingStatus}
        </Label>
        <Label className="text-lg font-semibold flex items-center gap-1">
          Total Price:{" "}
          <p className="text-orange-500">
            {orderItem.product.price * orderItem.quantity}
          </p>
        </Label>
      </div>
    </Link>
  );
};

export default OrderCard;
