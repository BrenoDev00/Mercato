import { Product } from "@prisma/client";

export interface ProductWithCategoriesOnProducts
  extends Omit<Product, "createdAt"> {
  categoriesOnProducts: {
    category: {
      id: string;
      name: string;
    };
  }[];
}
