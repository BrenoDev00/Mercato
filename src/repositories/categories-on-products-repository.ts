import { ICategoriesOnProductsRepository } from "../types/repositories/categories-on-products-repository.type.js";
import { prisma } from "../config/prisma-client.js";

class CategoriesOnProductsRepository
  implements ICategoriesOnProductsRepository
{
  async create(categoryId: string, productId: string): Promise<void> {
    await prisma.categoriesOnProducts.create({
      data: {
        categoryId,
        productId,
      },
    });
  }

  async edit(productCategoriesId: string[], productId: string): Promise<void> {
    await prisma.categoriesOnProducts.deleteMany({
      where: {
        productId,
      },
    });

    const categoriesOnProductsData = productCategoriesId.map((categoryId) => ({
      productId,
      categoryId,
    }));

    await prisma.categoriesOnProducts.createMany({
      data: categoriesOnProductsData,
    });
  }
}

export default CategoriesOnProductsRepository;
