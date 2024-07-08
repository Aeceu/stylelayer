import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleUpdateUser } from "@/store/actions/userAction";
import { AppDispatch, RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Address = () => {
  const { user, status } = useSelector((state: RootState) => state.user);
  const [updateInfo, setUpdateInfo] = useState(true);
  const [data, setData] = useState({
    region: user?.region,
    province: user?.province,
    city: user?.city,
    baranggay: user?.baranggay,
    street: user?.street,
    other: user?.other,
  });

  const handleCancelUpdate = () => {
    setUpdateInfo(true);
    setData({
      region: user?.region,
      province: user?.province,
      city: user?.city,
      baranggay: user?.baranggay,
      street: user?.street,
      other: user?.other,
    });
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleUpdate = () => {
    dispatch(handleUpdateUser({ user: user?.id, data })).finally(() => {
      setUpdateInfo(true);
    });
  };

  return (
    <div className="w-full p-4">
      <div className="h-full flex flex-col   bg-white-shade rounded-xl p-4 gap-4">
        <Label className="font-bold text-2xl tracking-wide">Address Information</Label>

        <div className="w-full grid grid-cols-4 place-content-start h-full gap-4 ">
          <span className="flex flex-col gap-2">
            <Label className="font-bold tracking-widest">Region</Label>
            <Input
              disabled={updateInfo}
              type="text"
              placeholder="type your region here..."
              className="px-6 py-6  border-2 border-black"
              value={data.region}
              onChange={(e) => setData({ ...data, region: e.target.value })}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-bold tracking-widest">Province</Label>
            <Input
              disabled={updateInfo}
              type="text"
              placeholder="type your province here..."
              className="px-6 py-6  border-2 border-black"
              value={data.province}
              onChange={(e) => setData({ ...data, province: e.target.value })}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-bold tracking-widest">City</Label>
            <Input
              disabled={updateInfo}
              type="text"
              placeholder="type your city here..."
              className="px-6 py-6  border-2 border-black"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-bold tracking-widest">Barangay</Label>
            <Input
              disabled={updateInfo}
              type="text"
              placeholder="type your baranggay here..."
              className="px-6 py-6  border-2 border-black"
              value={data.baranggay}
              onChange={(e) => setData({ ...data, baranggay: e.target.value })}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-bold tracking-widest">Street</Label>
            <Input
              disabled={updateInfo}
              type="text"
              placeholder="type your street here..."
              className="px-6 py-6  border-2 border-black"
              value={data.street}
              onChange={(e) => setData({ ...data, street: e.target.value })}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label className="font-bold tracking-widest">House no.,apt,courtside</Label>
            <Input
              disabled={updateInfo}
              type="text"
              placeholder="type your house no., apartment, etc here..."
              className="px-6 py-6  border-2 border-black"
              value={data.other}
              onChange={(e) => setData({ ...data, other: e.target.value })}
            />
          </span>
        </div>

        <span className="flex items-center gap-4">
          {!updateInfo ? (
            <>
              <Button
                disabled={status === "pending"}
                className="px-12 py-6 text-lg rounded-xl bg-emerald-500 text-white"
                onClick={handleUpdate}>
                {status === "pending" ? <Loader2 className="animate-spin w-8 h-8" /> : "Save"}
              </Button>
              <Button
                variant={"outline"}
                className="px-12 py-6 text-lg rounded-xl"
                onClick={handleCancelUpdate}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              className="bg-orange-500 text-lg rounded-xl px-12 py-6"
              onClick={() => setUpdateInfo(false)}>
              Update Info
            </Button>
          )}
        </span>
      </div>
    </div>
  );
};
export default Address;
