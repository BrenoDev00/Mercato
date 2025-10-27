export interface ICategoriesOnProductsRepository {
  addCategoryOnProduct(categoryId: string, productId: string): Promise<void>;

  editCategoryOnProduct(
    productCategoriesId: string[],
    productId: string
  ): Promise<void>;
}
