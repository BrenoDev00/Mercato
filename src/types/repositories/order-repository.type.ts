import { Order } from "@prisma/client";
import { OrderStatus } from "../order-status.type.js";

export interface IOrderRepository {
  addOrder(orderData: Omit<Order, "id">): Promise<string>;

  updateOrderById(
    orderId: string,
    orderData: { status: OrderStatus; updatedAt: string }
  ): Promise<void>;
}
