import { Router } from "express";
import userController from "../controllers/user-controller.js";
import schemaValidator from "../middlewares/schema-validator.js";
import statusSchema from "../schemas/status-schema.js";
import authValidator from "../middlewares/auth-validator.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";

const userRouter: Router = Router();

userRouter.use(authValidator);

userRouter.get(
  "/:id",
  roleValidator([Role.ADMIN, Role.EDITOR]),
  userController.getUserById
);

userRouter.patch(
  "/status/:id",
  roleValidator([Role.ADMIN]),
  schemaValidator(statusSchema),
  userController.changeUserStatus
);

export default userRouter;
