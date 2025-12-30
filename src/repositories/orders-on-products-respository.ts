import { OrdersOnProducts } from "@prisma/client";
import { IOrdersOnProductsRepository } from "../types/repositories/orders-on-products-repository.type.js";
import { prisma } from "../config/prisma-client.js";

class OrdersOnProductsRepository implements IOrdersOnProductsRepository {
  async create(
    ordersOnProductsData: Omit<OrdersOnProducts, "id">
  ): Promise<void> {
    await prisma.ordersOnProducts.create({
      data: ordersOnProductsData,
    });
  }
}

export default OrdersOnProductsRepository;
