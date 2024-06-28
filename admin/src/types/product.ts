import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  price: z.string().min(1, "Required"),
  stocks: z.string().min(1, "Required"),
});

export type TNewProduct = z.infer<typeof newProductSchema>;
