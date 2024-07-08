import { useDispatch, useSelector } from "react-redux";
import { Label } from "./ui/label";
import { AppDispatch, RootState } from "@/store/store";
import { BookUser, LayoutPanelLeft, Loader2, Pencil, Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import Logout from "./Logout";
import { Link, useLocation } from "react-router-dom";
import { handleFile } from "@/lib/HandleFile";
import { useState } from "react";
import toast from "react-hot-toast";
import { handleUpdateUserProfile } from "@/store/actions/userAction";

const ProfileSideBar = () => {
  const params = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedImage, setSelectedImage] = useState(user?.profilePicUrl);
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleGetImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading(true);
    try {
      const res = await handleFile(e);
      if (res) {
        await dispatch(handleUpdateUserProfile({ userId: user?.id, image: res })).then(() =>
          setSelectedImage(res)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get image!");
    } finally {
      setImageLoading(false);
    }
  };
  return (
    <div className="w-1/4 flex flex-col items-center p-8 gap-4 ">
      <div
        className={`flex items-center justify-center w-max flex-col gap-2 relative ${
          imageLoading && "animate-pulse"
        }`}>
        <img
          src={`${selectedImage ? selectedImage : "./pic-7.jpg"}`}
          alt="pic7"
          className={`border rounded-lg object-cover w-[200px] h-[200px] `}
        />
        <Label className="text-lg font-bold ">
          {user?.firstName} {user?.lastName}
        </Label>
        <Label
          className="bg-white rounded-md absolute top-2 right-2 p-1 w-7 h-7 z-10 border flex items-center justify-center"
          htmlFor={imageLoading ? "" : "file-upload"}>
          {imageLoading ? <Loader2 className="animate-spin " /> : <Pencil className="" />}
        </Label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleGetImage}
          accept=".jpg, .png, .jpeg"
        />
      </div>

      <div className="w-full h-full flex flex-col gap-4">
        <Link
          to="/profile"
          className={`flex items-center gap-2  rounded-xl p-4 hover:bg-white-shade-light ${
            params.pathname === "/profile" && "bg-white-shade-light"
          }`}>
          <LayoutPanelLeft
            className={`w-7 h-7 ${params.pathname === "/profile" && "text-orange-500"}`}
          />
          <Label className="text-lg tracking-wider">General Information</Label>
        </Link>

        <Separator />

        <Link
          to={"/profile/address"}
          className={`flex items-center gap-2  rounded-xl p-4 hover:bg-white-shade-light ${
            params.pathname === "/profile/address" && "bg-white-shade-light"
          }`}>
          <BookUser
            className={`w-7 h-7 ${params.pathname === "/profile/address" && "text-orange-500"}`}
          />
          <Label className="text-lg tracking-wider">Address</Label>
        </Link>

        <Separator />

        <Link
          to={"/profile/settings"}
          className={`flex items-center gap-2  rounded-xl p-4 hover:bg-white-shade-light ${
            params.pathname === "/profile/settings" && "bg-white-shade-light"
          }`}>
          <Settings
            className={`w-7 h-7 ${params.pathname === "/profile/settings" && "text-orange-500"}`}
          />
          <Label className="text-lg tracking-wider">Settings</Label>
        </Link>
      </div>

      <div className="w-full">
        <Logout size={"lg"} className="px-12 py-6 rounded-xl" />
      </div>
    </div>
  );
};
export default ProfileSideBar;
