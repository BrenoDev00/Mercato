import roleSchema from "../schemas/role-schema.js";
import RoleController from "../controllers/role-controller.js";
import { Router } from "express";
import schemaValidator from "../middlewares/schema-validator.js";
import authValidator from "../middlewares/auth-validator.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";
import RoleRepository from "../repositories/role-repository.js";
import RoleService from "../services/role-service.js";

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const roleRouter: Router = Router();

roleRouter.use(authValidator);

roleRouter.put(
  "/:id",
  roleValidator([Role.ADMIN]),
  schemaValidator(roleSchema),
  roleController.putRole.bind(roleController)
);

export default roleRouter;
