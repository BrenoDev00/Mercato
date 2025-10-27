import { Router } from "express";
import productController from "../controllers/product-controller.js";
import authValidator from "../middlewares/auth-validator.js";
import schemaValidator from "../middlewares/schema-validator.js";
import productSchema from "../schemas/product-schema.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";

const productRouter: Router = Router();

productRouter.use(authValidator);

productRouter.get("", productController.getProducts);

productRouter.post(
  "/",
  roleValidator([Role.ADMIN, Role.EDITOR]),
  schemaValidator(productSchema),
  productController.addProduct
);

productRouter.put(
  "/:id",
  roleValidator([Role.ADMIN]),
  schemaValidator(productSchema),
  productController.editProduct
);

productRouter.delete(
  "/:id",
  roleValidator([Role.ADMIN]),
  productController.deleteProduct
);

export default productRouter;
