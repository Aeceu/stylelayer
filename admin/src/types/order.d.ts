import { TProduct } from "./product";

export type TOrder = {
  id: string;
  userId: string;
  totalAmount: number;
  status: PENDING | PROCESSING | SHIPPED | DELIVERED | CANCELED;
  trackingInfo?: {
    id: string;
    orderId: string;
    currentStatus: string;
    location: string;
    updatedAt: Date;
  };

  orderItems: {
    id: string;
    product: TProduct;
    quantity: number;
    variants: [
      {
        name: string;
        option: string;
      }
    ];
    createdAt: Date;
    updatedAt: Date;
  }[];

  region: string;
  province: string;
  city: string;
  baranggay: string;
  street: string;
  other?: string;
};
