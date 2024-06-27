export type TNewProduct = {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  productImages: string[];
};

export type TNewProductImages = {
  imageId: string;
  imageUrl: string;
}[];
