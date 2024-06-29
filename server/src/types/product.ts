export type TNewProduct = {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  productImages: string[];
  variants: [{ name: string; options: string[] }];
};

export type TNewProductImages = {
  imageId: string;
  imageUrl: string;
}[];
