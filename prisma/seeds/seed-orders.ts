import { PrismaClient } from "@prisma/client";
import { orderDtos } from "./dtos/order-dtos.js";

export const seedOrders = async (prisma: PrismaClient): Promise<void> => {
  try {
    for (const order of orderDtos) {
      await prisma.order.upsert({
        where: { id: order.id },
        update: {},
        create: order,
      });
    }

    console.log("\nPedidos adicionados com sucesso ✅");
  } catch (error) {
    console.error("Erro ao adicionar pedidios ❌: ", error);
  }
};
