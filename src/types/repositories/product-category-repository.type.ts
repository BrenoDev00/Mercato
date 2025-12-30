export interface IProductCategoryRepository {
  findProductCategoryId(id: string): Promise<{ id: string } | null>;
}
