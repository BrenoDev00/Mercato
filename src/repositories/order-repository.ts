import { Order } from "@prisma/client";
import { prisma } from "../config/prisma-client.js";
import { IOrderRepository } from "../types/repositories/order-repository.type.js";
import { OrderStatus } from "../types/order-status.type.js";
import { OrdersInfo } from "../types/orders-info.type.js";

class OrderRepository implements IOrderRepository {
  async addOrder(
    orderData: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const addedOrder = await prisma.order.create({
      data: orderData,
    });

    return addedOrder.id;
  }

  async updateOrderById(
    orderId: string,
    orderData: { status: OrderStatus; updatedAt: string }
  ): Promise<void> {
    const { status, updatedAt } = orderData;

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
        updatedAt,
      },
    });
  }

  async getOrdersInfo(): Promise<OrdersInfo> {
    const ordersInfo = await prisma.order.findMany({
      select: {
        id: true,
        status: true,
        totalInCents: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        ordersOnProducts: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
                categoriesOnProducts: {
                  select: {
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return ordersInfo;
  }
}

const orderRepository = new OrderRepository();

export default orderRepository;
