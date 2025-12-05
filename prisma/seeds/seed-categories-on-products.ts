import { PrismaClient } from "@prisma/client";
import { categoriesOnProductsDtos } from "./dtos/categories-on-products-dtos";

export const seedCategoriesOnProducts = async (
  prisma: PrismaClient
): Promise<void> => {
  try {
    for (const categoryOnProduct of categoriesOnProductsDtos) {
      await prisma.categoriesOnProducts.upsert({
        where: { id: categoryOnProduct.id },
        update: {},
        create: categoryOnProduct,
      });
    }

    console.log("\nCategoriasProdutos adicionadas com sucesso ✅");
  } catch (error) {
    console.error("Erro ao adicionar CategoriasProdutos ❌: ", error);
  }
};
