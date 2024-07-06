import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, pageLoading } = useSelector((state: RootState) => state.user);

  if (pageLoading) {
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2 className="text-red-500 animate-spin w-10 h-10" />
    </div>;
  }

  return (
    <div className="w-full p-4">
      <div className="h-full flex flex-col  justify-between bg-white-shade rounded-xl p-4 gap-4">
        <Label className="font-bold text-2xl tracking-wide">General Information</Label>
        <div className="h-full grid grid-cols-2 place-content-start gap-4">
          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide ">First Name:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              disabled
              value={user?.firstName}
            />
          </span>

          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Last Name:</Label>
            <Input className="bg-inherit p-2 text-lg font-semibold" value={user?.lastName} />
          </span>

          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Username:</Label>
            <Input className="bg-inherit p-2 text-lg font-semibold" value={user?.username} />
          </span>
          <span className="space-y-2 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Age:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              type="number"
              value={user?.age}
            />
          </span>
          <span className="space-y-2  col-start-1">
            <Label className="text-muted-foreground font-bold tracking-wide">Phone:</Label>
            <Input
              className="bg-inherit p-2 text-lg font-semibold"
              type="number"
              value={user?.phone}
            />
          </span>

          <span className="space-y-2  col-start-1 ">
            <Label className="text-muted-foreground font-bold tracking-wide">Email:</Label>
            <Input className="bg-inherit p-2 text-lg font-semibold" value={user?.email} />
          </span>
        </div>

        <span className="flex items-center gap-4">
          <Button className="bg-orange-500 text-lg rounded-xl px-12 py-6">Update Info</Button>
          <Button variant={"outline"} className="px-12 py-6 text-lg rounded-xl">
            Cancel
          </Button>
        </span>
      </div>
    </div>
  );
};
export default Profile;
