export interface IProductCategoryRepository {
  getProductCategoryId(id: string): Promise<{ id: string } | null>;
}
