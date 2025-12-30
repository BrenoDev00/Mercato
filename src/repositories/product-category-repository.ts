import { prisma } from "../config/prisma-client.js";
import { IProductCategoryRepository } from "../types/repositories/product-category-repository.type.js";

class ProductCategoryRepository implements IProductCategoryRepository {
  async findProductCategoryId(id: string): Promise<{ id: string } | null> {
    const productCategoryId = await prisma.productCategory.findUnique({
      where: { id: id },
      select: { id: true },
    });

    return productCategoryId;
  }
}

export default ProductCategoryRepository;
