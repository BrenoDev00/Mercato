import { PrismaClient } from "@prisma/client";
import { ordersOnProductsDtos } from "./dtos/orders-on-products-dtos.js";

export const seedOrdersOnProducts = async (
  prisma: PrismaClient
): Promise<void> => {
  try {
    for (const orderOnProduct of ordersOnProductsDtos) {
      await prisma.ordersOnProducts.upsert({
        where: { id: orderOnProduct.id },
        update: {},
        create: orderOnProduct,
      });
    }

    console.log("\nPedidosProdutos adicionados com sucesso ✅");
  } catch (error) {
    console.error("Erro ao adicionar PedidosProdutos ❌: ", error);
  }
};
