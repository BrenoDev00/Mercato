import { Product } from "@prisma/client";

export interface ProductData extends Product {
  productCategoriesId: string[];
}
