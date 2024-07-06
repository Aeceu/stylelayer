import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { handleLogout } from "@/store/actions/userAction";
import { Loader2 } from "lucide-react";

type Props = {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
};

const Logout: React.FC<Props> = ({ className, size }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.user);

  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <Button
      onClick={logout}
      disabled={status === "pending"}
      size={size ? size : "sm"}
      className={`w-full ${className}`}>
      {status === "pending" ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
};
export default Logout;
