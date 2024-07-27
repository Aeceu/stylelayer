import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleUpdateUser } from "@/store/actions/userAction";
import { AppDispatch, RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { user, status } = useSelector((state: RootState) => state.user);
  const [updateInfo, setUpdateInfo] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    username: user?.username,
    phone: user?.phone,
    age: user?.age,
  });

  const handleCancelUpdate = () => {
    setUpdateInfo(true);
    setUpdatedUser({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      username: user?.username,
      phone: user?.phone,
      age: user?.age,
    });
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleUpdate = () => {
    dispatch(handleUpdateUser({ user: user?.id, data: updatedUser })).finally(() => {
      setUpdateInfo(true);
    });
  };

  return (
    <div className="w-full p-4">
      <div className="h-full flex flex-col  justify-between bg-white-shade rounded-xl p-4 gap-4">
        {updateInfo ? (
          <Label className="font-bold text-2xl tracking-wide">General Information</Label>
        ) : (
          <Label className="font-bold text-2xl tracking-wide text-red-500">
            Updating Information....
          </Label>
        )}
        <div className="h-full grid grid-cols-2 place-content-start gap-4">
          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide ">First Name:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              disabled={updateInfo}
              value={updatedUser.firstName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
            />
          </span>

          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Last Name:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              disabled={updateInfo}
              value={updatedUser.lastName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
            />
          </span>

          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Username:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              disabled={updateInfo}
              value={updatedUser.username}
              onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
            />
          </span>
          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Age:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              disabled={updateInfo}
              type="number"
              value={updatedUser.age}
              onChange={(e) => setUpdatedUser({ ...updatedUser, age: e.target.value })}
            />
          </span>
          <span className="space-y-2  col-start-1">
            <Label className="text-muted-foreground font-bold tracking-wide">Phone:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              disabled={updateInfo}
              type="number"
              value={updatedUser.phone}
              onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
            />
          </span>

          <span className="space-y-2  col-start-1 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Email:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              disabled={updateInfo}
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
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
export default Profile;
