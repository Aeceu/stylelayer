export type TOrder = {
  cartItem: {
    product: {
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
    quantity: string;
    variants: [
      {
        name: string;
        option: string;
      }
    ];
    id: string;
  }[];
  address: {
    region: string;
    province: string;
    city: string;
    baranggay: string;
    street: string;
    other?: string;
  };
};

export type TUpdateOrder = {
  status: PENDING | PROCESSING | SHIPPED | SHIPPED | DELIVERED | CANCELED;
  trackingInfo: {
    currentStatus: string;
    location: string;
  };
};
