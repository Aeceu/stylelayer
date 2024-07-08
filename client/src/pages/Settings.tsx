import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [retypenewPass, setRetypeNewPass] = useState("");
  return (
    <div className="w-full p-4">
      <div className="h-full flex flex-col   bg-white-shade rounded-xl p-4 gap-4">
        <Label className="font-bold text-2xl tracking-wide">Settings</Label>
        <Separator />
        <div className="flex flex-col gap-4">
          <Label className="text-2xl font-extrabold">Change password</Label>
          <span className="w-1/4 flex flex-col gap-2">
            <Label className="text-xs tracking-widest">Current password</Label>
            <Input
              type="text"
              placeholder="type your current password here..."
              className="border-black"
              value={currPass}
              onChange={(e) => setCurrPass(e.target.value)}
            />
          </span>
          <span className="w-1/4 flex flex-col gap-2">
            <Label className="text-xs tracking-widest">New password</Label>
            <Input
              type="text"
              placeholder="type your new password here..."
              className="border-black"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </span>
          <span className="w-1/4 flex flex-col gap-2">
            <Label className="text-xs tracking-widest">Confirm new password</Label>
            <Input
              type="text"
              placeholder="Re-type your current password here..."
              className="border-black"
              value={retypenewPass}
              onChange={(e) => setRetypeNewPass(e.target.value)}
            />
          </span>
          <span className="flex items-center gap-4">
            <Button size={"lg"} className="w-max bg-emerald-500 text-white">
              Change password
            </Button>
          </span>
        </div>
        <Separator />
        <span className="flex flex-col gap-4">
          <Label className="text-2xl font-extrabold text-red-500">Account Deletion</Label>
          <Label className="text-xs text-red-500 tracking-widest">
            Delete user's account, information, shopping information, orders and carts.
          </Label>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button variant={"destructive"} size={"lg"} className="w-max">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant={"destructive"} size={"lg"} className="w-max">
                  Delete
                </Button>
                <DialogClose>
                  <Button variant={"outline"} size={"lg"} className="w-max">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </span>
        <Separator />
      </div>
    </div>
  );
};
export default Settings;
