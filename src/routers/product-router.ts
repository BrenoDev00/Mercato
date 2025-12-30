import { Router } from "express";
import ProductController from "../controllers/product-controller.js";
import authValidator from "../middlewares/auth-validator.js";
import schemaValidator from "../middlewares/schema-validator.js";
import productSchema from "../schemas/product-schema.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";
import ProductService from "../services/product-service.js";
import ProductRepository from "../repositories/product-repository.js";
import ProductCategoryRepository from "../repositories/product-category-repository.js";
import CategoriesOnProductsRepository from "../repositories/categories-on-products-repository.js";

const productRepository = new ProductRepository();
const productCategoryRepository = new ProductCategoryRepository();
const categoriesOnProductsRepository = new CategoriesOnProductsRepository();

const productService = new ProductService(
  productRepository,
  productCategoryRepository,
  categoriesOnProductsRepository
);

const productController = new ProductController(productService);

const productRouter: Router = Router();

productRouter.use(authValidator);

productRouter.get("", productController.getProducts);

productRouter.post(
  "/",
  roleValidator([Role.ADMIN, Role.EDITOR]),
  schemaValidator(productSchema),
  productController.postProduct
);

productRouter.put(
  "/:id",
  roleValidator([Role.ADMIN]),
  schemaValidator(productSchema),
  productController.putProduct
);

productRouter.delete(
  "/:id",
  roleValidator([Role.ADMIN]),
  productController.deleteProduct
);

export default productRouter;
