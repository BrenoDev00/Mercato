import { Router } from "express";
import UserController from "../controllers/user-controller.js";
import schemaValidator from "../middlewares/schema-validator.js";
import statusSchema from "../schemas/status-schema.js";
import authValidator from "../middlewares/auth-validator.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";
import UserRepository from "../repositories/user-repository.js";
import UserService from "../services/user-service.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter: Router = Router();

userRouter.use(authValidator);

userRouter.get(
  "/:id",
  roleValidator([Role.ADMIN, Role.EDITOR]),
  userController.getUser
);

userRouter.patch(
  "/status/:id",
  roleValidator([Role.ADMIN]),
  schemaValidator(statusSchema),
  userController.patchStatus
);

export default userRouter;
