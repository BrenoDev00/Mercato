import { Product } from "@prisma/client";
import { ProductWithCategoriesOnProducts } from "../product-with-categories-on-products.type.js";

export interface IProductRepository {
  getProductId(id: string): Promise<{ id: string } | null>;

  getProducts(): Promise<ProductWithCategoriesOnProducts[]>;

  addProduct(productData: Omit<Product, "id" | "createdAt">): Promise<Product>;

  editProduct(
    productData: Omit<Product, "createdAt">
  ): Promise<Omit<Product, "createdAt">>;

  deleteProduct(productId: string): Promise<void>;
}
