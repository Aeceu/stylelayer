import { loginSchema, signupSchema } from "@/schema/userSchema";
import { z } from "zod";

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  country?: string;
  region?: string;
  city?: string;
  baranggay?: string;
  street?: string;
  others?: string;

  createdAt: string;
  updatedAt: string;
};

export type TUserLogin = z.infer<typeof loginSchema>;
export type TUserSignup = z.infer<typeof signupSchema>;
