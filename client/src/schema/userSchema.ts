import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export const signupSchema = z.object({
  email: z.string().email().min(1, "Required"),
  password: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
});
