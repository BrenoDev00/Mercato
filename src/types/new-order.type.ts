import { Order } from "@prisma/client";

export interface NewOrder extends Omit<Order, "id" | "status"> {
  products: {
    id: string;
    quantity: number;
  }[];
}
