import { Product } from "@prisma/client";
import { ProductWithCategoriesOnProducts } from "../product-with-categories-on-products.type.js";

export interface IProductRepository {
  findProductId(id: string): Promise<{ id: string } | null>;

  findMany(): Promise<ProductWithCategoriesOnProducts[]>;

  create(productData: Omit<Product, "id" | "createdAt">): Promise<Product>;

  edit(
    productData: Omit<Product, "createdAt">
  ): Promise<Omit<Product, "createdAt">>;

  delete(productId: string): Promise<void>;
}
