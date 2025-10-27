import { Router } from "express";
import authValidator from "../middlewares/auth-validator.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";
import orderController from "../controllers/order-controller.js";
import schemaValidator from "../middlewares/schema-validator.js";
import orderSchema from "../schemas/order-schema.js";

const orderRouter: Router = Router();

orderRouter.use(authValidator);

orderRouter.post(
  "/new",
  roleValidator([Role.USER]),
  schemaValidator(orderSchema),
  orderController.addOrder
);

export default orderRouter;
