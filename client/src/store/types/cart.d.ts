export type TCartItem = {
  item: TProduct;
  quantity: string;
  size: string;
  color: string;
  id: string;
};

export type TProduct = {
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
  productAlt: string;
  ratings: number;
  productQuantity: number;
  productCategory: string;
};
