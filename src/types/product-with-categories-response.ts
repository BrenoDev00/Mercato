import { ProductWithCategories } from "./product-with-categories.type.js";

export type ProductWithCategoriesResponse = {
  total: number;
  products: ProductWithCategories[];
};
