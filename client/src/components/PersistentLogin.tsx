import { handleRefresh } from "@/store/actions/userAction";
import { AppDispatch, RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const PersistentLogin = () => {
  const { accessToken, pageLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    !accessToken && dispatch(handleRefresh());
  }, []);

  return (
    <>
      {pageLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader2 className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default PersistentLogin;
