import { loginSchema, signupSchema } from "@/schema/userSchema";
import { z } from "zod";

export type TUser = {
  id: string;

  username?: string;
  firstName: string;
  lastName: string;

  age?: string;
  phone?: string;
  email: string;

  country?: string;
  region?: string;
  city?: string;
  baranggay?: string;
  street?: string;
  other?: string;

  profilePicId?: string;
  profilePicUrl?: string;

  createdAt: string;
  updatedAt: string;
};

export type TUserLogin = z.infer<typeof loginSchema>;
export type TUserSignup = z.infer<typeof signupSchema>;
