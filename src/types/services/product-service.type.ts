import { ProductData } from "../new-product.type.js";
import { ProductWithCategoriesResponse } from "../product-with-categories-response.type.js";

export interface IProductService {
  listAll(): Promise<ProductWithCategoriesResponse>;

  create(
    productData: Omit<ProductData, "id" | "createdAt">
  ): Promise<ProductData>;

  editById(
    productData: Omit<ProductData, "createdAt">
  ): Promise<Omit<ProductData, "createdAt">>;

  deleteById(productId: string): Promise<void>;
}
