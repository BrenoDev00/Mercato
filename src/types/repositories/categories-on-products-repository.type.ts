export interface ICategoriesOnProductsRepository {
  create(categoryId: string, productId: string): Promise<void>;

  edit(productCategoriesId: string[], productId: string): Promise<void>;
}
