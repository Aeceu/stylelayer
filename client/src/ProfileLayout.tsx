import { Outlet } from "react-router-dom";
import ProfileSideBar from "./components/ProfileSideBar";
import { Separator } from "./components/ui/separator";

const ProfileLayout = () => {
  return (
    <div className="w-full flex h-[calc(100vh-100px-40px)]">
      <ProfileSideBar />
      <Separator orientation="vertical" />
      <Outlet />
    </div>
  );
};
export default ProfileLayout;
