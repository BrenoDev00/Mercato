import roleSchema from "../schemas/role-schema.js";
import roleController from "../controllers/role-controller.js";
import { Router } from "express";
import schemaValidator from "../middlewares/schema-validator.js";
import authValidator from "../middlewares/auth-validator.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";

const roleRouter: Router = Router();

roleRouter.use(authValidator);

roleRouter.put(
  "/:id",
  roleValidator([Role.ADMIN]),
  schemaValidator(roleSchema),
  roleController.updateRoleById
);

export default roleRouter;
