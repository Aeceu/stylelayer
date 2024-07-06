import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { handleLogout } from "@/store/actions/userAction";
import { Loader2 } from "lucide-react";

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.user);

  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <Button onClick={logout} disabled={status === "pending"} size={"sm"} className="w-full">
      {status === "pending" ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
};
export default Logout;
