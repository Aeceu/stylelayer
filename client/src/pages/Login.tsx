import { TUserLogin } from "@/store/types/user";
import { Ellipsis, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/userSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { handleLogin } from "@/store/actions/userAction";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<TUserLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (data: TUserLogin) => {
    dispatch(handleLogin({ email: data.email, password: data.password, navigate })).finally(() => {
      form.reset();
    });
  };
  return (
    <div className="h-screen flex p-8 bg-white-shade">
      <div className="w-full flex rounded-3xl bg-white shadow-md">
        <div className="w-1/2 flex flex-col p-4">
          <span className="flex items-center gap-2">
            <Ellipsis className="w-20 h-20" />
            <Link to={"/"} className="title tracking-widest text-4xl ">
              StyleLayerCo.
            </Link>
          </span>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-full flex flex-col items-center justify-center gap-2">
              <Label className="tracking-widest font-extrabold text-3xl">Welcome.</Label>
              {status === "failed" && error && (
                <Label className="w-1/2 text-xs font-bold text-red-500">
                  {error.data?.message}
                </Label>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-1/2 relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type={`${showPass ? "text" : "password"}`} className="" />
                    </FormControl>
                    {showPass ? (
                      <EyeOff
                        className="absolute z-10 top-8 right-2"
                        onClick={() => setShowPass(!showPass)}
                      />
                    ) : (
                      <Eye
                        className="absolute z-10 top-8 right-2"
                        onClick={() => setShowPass(!showPass)}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={status === "pending"} type="submit" className="w-1/2">
                {status === "pending" ? <Loader2 className="animate-spin" /> : "Log in"}
              </Button>

              <div className="w-1/2 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Checkbox id="Remember_me" />
                  <Label htmlFor="Remember_me">Remember me</Label>
                </span>
                <Link to="/">Forgot password</Link>
              </div>
            </form>
          </Form>
          <div className="text-lg flex items-center justify-center gap-2">
            <Label>Don't have an account?</Label>
            <Link to="/signup" className="font-extrabold text-blue-500">
              Sign up
            </Link>
          </div>
        </div>
        <div className="w-1/2 rounded-3xl overflow-hidden">
          <img src="./authbg.jpg" alt="authbg" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
export default Login;
