import { ProductData } from "../new-product.type.js";
import { ProductWithCategoriesResponse } from "../product-with-categories-response.js";

export interface IProductService {
  getProducts(): Promise<ProductWithCategoriesResponse>;

  addProduct(
    productData: Omit<ProductData, "id" | "createdAt">
  ): Promise<ProductData>;

  editProduct(
    productData: Omit<ProductData, "createdAt">
  ): Promise<Omit<ProductData, "createdAt">>;

  deleteProduct(productId: string): Promise<void>;
}
