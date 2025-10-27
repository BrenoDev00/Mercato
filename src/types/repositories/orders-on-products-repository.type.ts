import { OrdersOnProducts } from "@prisma/client";

export interface IOrdersOnProductsRepository {
  addOrderOnProduct(ordersOnProductsData: OrdersOnProducts): Promise<void>;
}
