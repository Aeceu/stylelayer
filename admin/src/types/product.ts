import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  price: z.string().min(1, "Required"),
  stock: z.string().min(1, "Required"),
});

export type TNewProduct = z.infer<typeof newProductSchema>;

export type TProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  sold: number;
  variants: [
    {
      name: string;
      options: string[];
    }
  ];
  productImage: [
    {
      imageId: string;
      imageUrl: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
};
