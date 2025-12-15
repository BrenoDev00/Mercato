import { Router } from "express";
import schemaValidator from "../middlewares/schema-validator.js";
import loginSchema from "../schemas/login-schema.js";
import userSchema from "../schemas/user-schema.js";
import AuthService from "../services/auth-service.js";
import UserRepository from "../repositories/user-repository.js";
import userAddressRepository from "../repositories/user-address-repository.js";
import RoleRepository from "../repositories/role-repository.js";
import AuthController from "../controllers/auth-controller.js";

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const authService = new AuthService(
  userRepository,
  userAddressRepository,
  roleRepository
);
const authController = new AuthController(authService);

const authRouter: Router = Router();

authRouter.post(
  "/registration",
  schemaValidator(userSchema),
  authController.postRegister
);

authRouter.post(
  "/login",
  schemaValidator(loginSchema),
  authController.postLogin
);

export default authRouter;
