import { PrismaClient } from "@prisma/client";
import { productDtos } from "./dtos/product-dtos";

export const seedProducts = async (prisma: PrismaClient): Promise<void> => {
  try {
    for (const product of productDtos) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: product,
      });
    }

    console.log("\nProdutos adicionados com sucesso ✅");
  } catch (error) {
    console.error("Erro ao adicionar produtos ❌: ", error);
  }
};
