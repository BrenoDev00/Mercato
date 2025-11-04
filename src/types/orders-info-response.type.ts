import { OrderStatus } from "./order-status.type.js";

export type OrdersInfoResponse = {
  total: number;
  ordersInfo: {
    id: string;
    status: OrderStatus;
    totalInCents: number;
    createdAt: Date;
    updatedAt: Date | null;
    buyer: {
      id: string;
      name: string;
    };
    products: {
      quantity: number;
      id: string;
      name: string;
      priceInCents: number;
      categories: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
};
