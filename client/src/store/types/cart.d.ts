import { TProduct } from "./product";

export type TCartItem = {
  item: TProduct;
  quantity: string;
  variants: {
    name: string;
    option: string;
  }[];
  id: string;
};
