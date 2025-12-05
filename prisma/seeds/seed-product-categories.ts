import { PrismaClient } from "@prisma/client";
import { productCategoryDtos } from "./dtos/product-category-dtos";

export const seedProductCategories = async (
  prisma: PrismaClient
): Promise<void> => {
  try {
    for (const category of productCategoryDtos) {
      await prisma.productCategory.upsert({
        where: { id: category.id },
        update: {},
        create: category,
      });
    }

    console.log("\nCategorias de produtos adicionadas com sucesso ✅");
  } catch (error) {
    console.error("Erro ao adicionar categorias de produtos ❌: ", error);
  }
};
