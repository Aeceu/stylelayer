import { TNewProduct } from "./product";

export type TAddToCartBody = {
  productId: string;
  quantity: string;
  variants: {
    name: string;
    option: string;
  }[];
};
