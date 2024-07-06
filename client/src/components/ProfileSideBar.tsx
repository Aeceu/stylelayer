import { useSelector } from "react-redux";
import { Label } from "./ui/label";
import { RootState } from "@/store/store";
import { BookUser, LayoutPanelLeft, Pencil, Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import Logout from "./Logout";
import { useLocation } from "react-router-dom";

const ProfileSideBar = () => {
  const params = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-1/4 flex flex-col items-center p-8 gap-4 ">
      <div className="flex items-center justify-center w-max flex-col gap-2 relative ">
        <img src="./pic-7.jpg" alt="pic7" className="rounded-lg object-cover w-[200px] h-[200px]" />
        <Label className="text-lg font-bold ">
          {user?.firstName} {user?.lastName}
        </Label>
        <Pencil className="bg-white rounded-md absolute top-2 right-2 p-1 w-7 h-7 " />
      </div>

      <div className="w-full h-full flex flex-col gap-4">
        <div
          className={`flex items-center gap-2  rounded-xl p-4 ${
            params.pathname === "/profile" && "bg-white-shade-light"
          }`}>
          <LayoutPanelLeft
            className={`w-7 h-7 ${params.pathname === "/profile" && "text-orange-500"}`}
          />
          <Label className="text-lg tracking-wider">General Information</Label>
        </div>

        <Separator />

        <div
          className={`flex items-center gap-2  rounded-xl p-4 ${
            params.pathname === "/profile/address" && "bg-white-shade-light"
          }`}>
          <BookUser
            className={`w-7 h-7 ${params.pathname === "/profile/address" && "text-orange-500"}`}
          />
          <Label className="text-lg tracking-wider">Address</Label>
        </div>

        <Separator />

        <div
          className={`flex items-center gap-2  rounded-xl p-4 ${
            params.pathname === "/profile/settings" && "bg-white-shade-light"
          }`}>
          <Settings
            className={`w-7 h-7 ${params.pathname === "/profile/settings" && "text-orange-500"}`}
          />
          <Label className="text-lg tracking-wider">Settings</Label>
        </div>
      </div>

      <div className="w-full">
        <Logout size={"lg"} className="px-12 py-6 rounded-xl" />
      </div>
    </div>
  );
};
export default ProfileSideBar;
