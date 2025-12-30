import { Order } from "@prisma/client";
import { OrderStatus } from "../order-status.type.js";
import { OrdersInfo } from "../orders-info.type.js";

export interface IOrderRepository {
  create(orderData: Omit<Order, "id">): Promise<string>;

  update(
    orderId: string,
    orderData: { status: OrderStatus; updatedAt: string }
  ): Promise<void>;

  findOrdersInfo(): Promise<OrdersInfo>;
}
