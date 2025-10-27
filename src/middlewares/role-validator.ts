import { Request, Response, NextFunction } from "express";
import userService from "../services/user-service.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import { USER_NOT_FOUND, USER_UNAUTHORIZED } from "../utils/constants.js";
import UnauthorizedError from "../utils/errors/unauthorized-error.js";
import { Role } from "../types/role.type.js";
import pkg, { JwtPayload } from "jsonwebtoken";

const roleValidator = (permittedRoles: Role[]) => {
  return async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    const { verify } = pkg;

    const accessToken = req.headers.authorization;
    const formattedAccessToken = accessToken?.split(" ")[1] as string;

    const decodedToken = verify(
      formattedAccessToken,
      process.env.HASH_SECRET as string
    ) as JwtPayload;

    const userId = decodedToken.id;

    const searchedUser = await userService.getUserById(userId);

    if (!searchedUser) throw new NotFoundError(USER_NOT_FOUND);

    const { name } = searchedUser.role;

    const isUserAuthorized = permittedRoles.includes(name as Role);

    if (!isUserAuthorized) throw new UnauthorizedError(USER_UNAUTHORIZED);

    next();
  };
};

export default roleValidator;
