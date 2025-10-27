import productRepository from "../repositories/product-repository.js";
import { IProductService } from "../types/services/product-service.type.js";
import productCategoryRepository from "../repositories/product-category-repository.js";
import {
  PRODUCT_CATEGORY_NOT_FOUND,
  PRODUCT_NOT_FOUND,
} from "../utils/constants.js";
import { ProductData } from "../types/new-product.type.js";
import categoriesOnProducts from "../repositories/categories-on-products-repository.js";
import { ProductWithCategoriesResponse } from "../types/product-with-categories-response.js";

class ProductService implements IProductService {
  async getProducts(): Promise<ProductWithCategoriesResponse> {
    const products = await productRepository.getProducts();

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

  async addProduct(
    productData: Omit<ProductData, "id" | "createdAt">
  ): Promise<ProductData> {
    const { productCategoriesId, name, description, priceInCents } =
      productData;

    for (const categoryId of productCategoriesId) {
      const searchedProductCategoryId =
        await productCategoryRepository.getProductCategoryId(categoryId);

      if (!searchedProductCategoryId)
        throw new Error(PRODUCT_CATEGORY_NOT_FOUND);
    }

    const addedProduct = await productRepository.addProduct({
      name,
      description,
      priceInCents,
    });

    for (const categoryId of productCategoriesId) {
      categoriesOnProducts.addCategoryOnProduct(categoryId, addedProduct.id);
    }

    return {
      ...addedProduct,
      productCategoriesId,
    };
  }

  async editProduct(
    productData: Omit<ProductData, "createdAt">
  ): Promise<Omit<ProductData, "createdAt">> {
    const { id, name, description, priceInCents, productCategoriesId } =
      productData;

    const searchedProductId = await productRepository.getProductId(id);

    if (!searchedProductId) throw new Error(PRODUCT_NOT_FOUND);

    for (const categoryId of productCategoriesId) {
      const searchedProductCategoryId =
        await productCategoryRepository.getProductCategoryId(categoryId);

      if (!searchedProductCategoryId)
        throw new Error(PRODUCT_CATEGORY_NOT_FOUND);
    }

    const editedProduct = await productRepository.editProduct({
      id,
      name,
      description,
      priceInCents,
    });

    await categoriesOnProducts.editCategoryOnProduct(productCategoriesId, id);

    return { ...editedProduct, productCategoriesId };
  }

  async deleteProduct(productId: string): Promise<void> {
    const searchedProductId = await productRepository.getProductId(productId);

    if (!searchedProductId) throw new Error(PRODUCT_NOT_FOUND);

    await productRepository.deleteProduct(productId);
  }
}

const productService = new ProductService();

export default productService;
