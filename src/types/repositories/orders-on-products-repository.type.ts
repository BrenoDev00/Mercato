import { OrdersOnProducts } from "@prisma/client";

export interface IOrdersOnProductsRepository {
  create(ordersOnProductsData: OrdersOnProducts): Promise<void>;
}
