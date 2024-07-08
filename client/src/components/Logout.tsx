import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { AppDispatch } from "@/store/store";
import { handleLogout } from "@/store/actions/userAction";

type Props = {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
};

const Logout: React.FC<Props> = ({ className, size }) => {
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <Button onClick={logout} size={size ? size : "sm"} className={`w-full ${className}`}>
      Logout
    </Button>
  );
};
export default Logout;
