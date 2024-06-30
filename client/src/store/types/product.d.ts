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
