/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IAuthController } from "../types/controllers/auth-controller.type.js";
import { StatusCode } from "../types/status-code.type.js";
import InternalError from "../utils/errors/internal-error.js";
import {
  EMAIL_ALREADY_IN_USE,
  INVALID_USER_CREDENTIALS,
  ROLE_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import ConflictError from "../utils/errors/conflict-error.js";
import UnauthenticatedError from "../utils/errors/unauthenticated-error.js";
import AuthService from "../services/auth-service.js";

class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  async postRegister(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
      const registeredUser = await this.authService.register(body);

      return res.status(StatusCode.CREATED).send(registeredUser);
    } catch (error: any) {
      if (error.message === EMAIL_ALREADY_IN_USE)
        throw new ConflictError(EMAIL_ALREADY_IN_USE);

      if (error.message === ROLE_NOT_FOUND)
        throw new NotFoundError(ROLE_NOT_FOUND);

      throw new InternalError();
    }
  }

  async postLogin(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
      const accessToken = await this.authService.login(body);

      return res.status(StatusCode.OK).send(accessToken);
    } catch (error: any) {
      if (error.message === INVALID_USER_CREDENTIALS)
        throw new UnauthenticatedError(INVALID_USER_CREDENTIALS);

      if (error.message === USER_NOT_FOUND)
        throw new NotFoundError(USER_NOT_FOUND);

      throw new InternalError();
    }
  }
}

export default AuthController;
