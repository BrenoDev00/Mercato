import { Product } from "@prisma/client";
import { prisma } from "../config/prisma-client.js";
import { IProductRepository } from "../types/repositories/product-repository.type.js";
import { ProductWithCategoriesOnProducts } from "../types/product-with-categories-on-products.type.js";

class ProductRepository implements IProductRepository {
  async findProductId(id: string): Promise<{ id: string } | null> {
    const productId = await prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });

    return productId;
  }

  async findMany(): Promise<ProductWithCategoriesOnProducts[]> {
    const products = await prisma.product.findMany({
      omit: {
        createdAt: true,
      },
      include: {
        categoriesOnProducts: {
          select: {
            category: true,
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });

    return products;
  }

  async create(
    productData: Omit<Product, "id" | "createdAt">
  ): Promise<Product> {
    const addedProduct = await prisma.product.create({
      data: productData,
    });

    return addedProduct;
  }

  async edit(
    productData: Omit<Product, "createdAt">
  ): Promise<Omit<Product, "createdAt">> {
    const { id } = productData;

    const editedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: productData,
      omit: { createdAt: true },
    });

    return editedProduct;
  }

  async delete(productId: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}

export default ProductRepository;
