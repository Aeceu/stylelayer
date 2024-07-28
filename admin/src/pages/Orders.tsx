import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useSearchParams } from "react-router-dom";
import { TOrder } from "@/types/order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const Orders = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
  const [status, setStatus] = useState<
    "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | null | string
  >(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/orders?page=${page}&pageSize=${pageSize}`);
        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  type TUpdateOrder = {
    orderId: string;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | string;
  };

  const updateOrder = async ({ orderId, status }: TUpdateOrder) => {
    try {
      setLoadingUpdateStatus(true);
      const res = await axios.put(`/order/status/${orderId}`, { status });
      console.log(res.data.message);
      console.log(res.data.updateOrder);

      setOrders(orders.map((item) => (item.id === orderId ? res.data.updatedOrder : item)));
      toast.success("Order status updated successfull!", {
        className: "w-full shrink-0",
      });
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO UPDATED ORDER STATUS!!");
    } finally {
      setLoadingUpdateStatus(false);
    }
  };

  const fetchOrdersByStatus = async (e: string) => {
    setStatus(e);
    try {
      const res = await axios.get(`/orders?page=${page}&pageSize=${pageSize}&status=${e}`);

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders by status!");
    }
  };

  return (
    <div className="w-full h-full bg-[#0b0b0b] text-white flex flex-col ">
      <div className="h-[100px] flex items-center justify-between px-4">
        <Label className="title  text-5xl tracking-widest">StyleLayerCo.</Label>
      </div>

      <div className="flex items-center gap-2 p-4">
        <h1>Filter by status:</h1>
        <Select value={status ? status : undefined} onValueChange={(e) => fetchOrdersByStatus(e)}>
          <SelectTrigger className="w-[300px]  bg-inherit">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="PROCESSING">PROCESSING</SelectItem>
            <SelectItem value="SHIPPED">SHIPPED</SelectItem>
            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="border-y border-background">
        <TableHeader>
          <TableRow className="hover:bg-[#222222] cursor-pointer divide-x-2">
            <TableHead className="shrink-0 whitespace-nowrap w-[400px]">Orders</TableHead>
            <TableHead className="shrink-0 whitespace-nowrap w-[200px]">Quantity</TableHead>
            <TableHead className="w-[200px]">Total Price</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 &&
            orders.map((item, i) => (
              <TableRow key={i} className="hover:bg-[#222222] cursor-pointer divide-x-2">
                <TableCell className="text-xs flex flex-col gap-1">
                  {item.orderItems.map((orderItem, i) => (
                    <p key={i}>{orderItem.product.name} ,</p>
                  ))}
                </TableCell>
                <TableCell>
                  {item.orderItems.reduce((val, orderItem) => {
                    return val + orderItem.quantity;
                  }, 0)}
                </TableCell>
                <TableCell>
                  {item.orderItems.reduce((val, orderItem) => {
                    return val + orderItem.quantity * parseFloat(orderItem.product.price);
                  }, 0)}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Select
                    disabled={loadingUpdateStatus}
                    value={item.status}
                    onValueChange={(e) => updateOrder({ orderId: item.id, status: e })}>
                    <SelectTrigger className="w-full bg-inherit">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                      <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                      <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#0b0b0b] border-background/50 text-white">
                      <DropdownMenuItem className="text-emerald-500 hover:bg-emerald-500 hover:text-white">
                        Update stock
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-emerald-500 hover:bg-emerald-500 hover:text-white">
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 hover:bg-red-500 hover:text-white">
                        Delete product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Orders;
