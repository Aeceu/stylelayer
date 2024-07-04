import { Ellipsis, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { TUserSignup } from "@/store/types/user";
import { signupSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { handleSignup } from "@/store/actions/userAction";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<TUserSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: TUserSignup) => {
    dispatch(
      handleSignup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        navigate,
      })
    ).finally(() => {
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
              <Label className="tracking-widest font-extrabold text-3xl">Sign up an account.</Label>
              {status === "failed" && error && (
                <Label className="w-1/2 text-xs font-bold text-red-500">
                  {error.data?.message}
                </Label>
              )}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                {status === "pending" ? <Loader2 className="animate-spin" /> : "Sign up"}
              </Button>
            </form>
          </Form>
          <div className="text-lg flex items-center justify-center gap-2">
            <Label>Already have an account?</Label>
            <Link to="/login" className="font-extrabold text-blue-500">
              Log in
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
export default Signup;
