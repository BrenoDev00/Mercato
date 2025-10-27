import { Router } from "express";
import authController from "../controllers/auth-controller.js";
import schemaValidator from "../middlewares/schema-validator.js";
import loginSchema from "../schemas/login-schema.js";
import userSchema from "../schemas/user-schema.js";

const authRouter: Router = Router();

authRouter.post(
  "/registration",
  schemaValidator(userSchema),
  authController.register
);

authRouter.post("/login", schemaValidator(loginSchema), authController.login);

export default authRouter;
