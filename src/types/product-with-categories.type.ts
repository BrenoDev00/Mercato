import { Product } from "@prisma/client";

export interface ProductWithCategories extends Omit<Product, "createdAt"> {
  categories: {
    id: string;
    name: string;
  }[];
}
