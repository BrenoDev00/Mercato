import { Order } from "@prisma/client";

export interface IOrderRepository {
  addOrder(orderData: Omit<Order, "id">): Promise<string>;
}
