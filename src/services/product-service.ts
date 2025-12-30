import { IProductService } from "../types/services/product-service.type.js";
import ProductCategoryRepository from "../repositories/product-category-repository.js";
import {
  PRODUCT_CATEGORY_NOT_FOUND,
  PRODUCT_NOT_FOUND,
} from "../utils/constants.js";
import { ProductData } from "../types/new-product.type.js";
import { ProductWithCategoriesResponse } from "../types/product-with-categories-response.type.js";
import ProductRepository from "../repositories/product-repository.js";
import CategoriesOnProductsRepository from "../repositories/categories-on-products-repository.js";

class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryRepository: ProductCategoryRepository,
    private readonly categoriesOnProductsRepository: CategoriesOnProductsRepository
  ) {}

  async listAll(): Promise<ProductWithCategoriesResponse> {
    const products = await this.productRepository.findMany();

    const formattedProductsList = products.map((product) => {
      const { id, name, description, priceInCents, categoriesOnProducts } =
        product;

      const categoriesList = categoriesOnProducts.map((categoryOnProduct) => {
        return {
          id: categoryOnProduct.category.id,
          name: categoryOnProduct.category.name,
        };
      });

      return {
        id,
        name,
        description,
        priceInCents,
        categories: categoriesList,
      };
    });

    const productWithCategoriesResponse: ProductWithCategoriesResponse = {
      total: formattedProductsList.length,
      products: formattedProductsList,
    };

    return productWithCategoriesResponse;
  }

  async create(
    productData: Omit<ProductData, "id" | "createdAt">
  ): Promise<ProductData> {
    const { productCategoriesId, name, description, priceInCents } =
      productData;

    for (const categoryId of productCategoriesId) {
      const searchedProductCategoryId =
        await this.productCategoryRepository.findProductCategoryId(categoryId);

      if (!searchedProductCategoryId)
        throw new Error(PRODUCT_CATEGORY_NOT_FOUND);
    }

    const addedProduct = await this.productRepository.create({
      name,
      description,
      priceInCents,
    });

    for (const categoryId of productCategoriesId) {
      this.categoriesOnProductsRepository.create(categoryId, addedProduct.id);
    }

    return {
      ...addedProduct,
      productCategoriesId,
    };
  }

  async editById(
    productData: Omit<ProductData, "createdAt">
  ): Promise<Omit<ProductData, "createdAt">> {
    const { id, name, description, priceInCents, productCategoriesId } =
      productData;

    const searchedProductId = await this.productRepository.findProductId(id);

    if (!searchedProductId) throw new Error(PRODUCT_NOT_FOUND);

    for (const categoryId of productCategoriesId) {
      const searchedProductCategoryId =
        await this.productCategoryRepository.findProductCategoryId(categoryId);

      if (!searchedProductCategoryId)
        throw new Error(PRODUCT_CATEGORY_NOT_FOUND);
    }

    const editedProduct = await this.productRepository.edit({
      id,
      name,
      description,
      priceInCents,
    });

    await this.categoriesOnProductsRepository.edit(productCategoriesId, id);

    return { ...editedProduct, productCategoriesId };
  }

  async deleteById(productId: string): Promise<void> {
    const searchedProductId = await this.productRepository.findProductId(
      productId
    );

    if (!searchedProductId) throw new Error(PRODUCT_NOT_FOUND);

    await this.productRepository.delete(productId);
  }
}

export default ProductService;
