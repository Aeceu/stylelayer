import { TProduct } from "./product";

export type TCartItem = {
  product: TProduct;
  quantity: string;
  variants: {
    name: string;
    option: string;
  }[];
  id: string;
};
