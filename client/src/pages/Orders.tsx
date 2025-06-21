import { handleGetOrders } from "@/store/actions/orderAction";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import All from "@/components/tabs/All";
import Pending from "@/components/tabs/Pending";
import Processing from "@/components/tabs/Processing";
import Shipped from "@/components/tabs/Shipped";
import Delivered from "@/components/tabs/Delivered";
import Cancelled from "@/components/tabs/Cancelled";

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      dispatch(handleGetOrders(user.id));
    }
  }, []);

  return (
    <Tabs
      defaultValue={"ALL"}
      className="w-full p-8 flex flex-col items-center h-[calc(100vh-140px)]"
    >
      <TabsList className="h-max">
        <TabsTrigger className="px-8 py-4 " value="ALL">
          All
        </TabsTrigger>
        <TabsTrigger className="px-8 py-4 " value="PENDING">
          To Process
        </TabsTrigger>
        <TabsTrigger className="px-8 py-4 " value="PROCESSING">
          To Ship
        </TabsTrigger>
        <TabsTrigger className="px-8 py-4 " value="SHIPPED">
          To Receive
        </TabsTrigger>
        <TabsTrigger className="px-8 py-4 " value="DELIVERED">
          Completed
        </TabsTrigger>
        <TabsTrigger className="px-8 py-4 " value="CANCELLED">
          Cancelled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ALL" className="w-full h-full overflow-y-auto">
        <All />
      </TabsContent>
      <TabsContent value="PENDING" className="w-full h-full">
        <Pending />
      </TabsContent>
      <TabsContent value="PROCESSING" className="w-full h-full">
        <Processing />
      </TabsContent>
      <TabsContent value="SHIPPED" className="w-full h-full">
        <Shipped />
      </TabsContent>
      <TabsContent value="DELIVERED" className="w-full h-full">
        <Delivered />
      </TabsContent>
      <TabsContent value="CANCELLED" className="w-full h-full">
        <Cancelled />
      </TabsContent>
    </Tabs>
  );
};
export default Orders;
