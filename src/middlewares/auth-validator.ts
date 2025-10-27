import { Request, Response, NextFunction } from "express";
import { INVALID_TOKEN, TOKEN_NOT_SPECIFIED } from "../utils/constants.js";
import pkg from "jsonwebtoken";
import UnauthenticatedError from "../utils/errors/unauthenticated-error.js";

const authValidator = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.headers.authorization;

  if (!accessToken) throw new UnauthenticatedError(TOKEN_NOT_SPECIFIED);

  const formattedAccessToken = accessToken.split(" ")[1] as string;

  const { verify } = pkg;

  try {
    verify(formattedAccessToken, process.env.HASH_SECRET as string);

    next();
  } catch {
    throw new UnauthenticatedError(INVALID_TOKEN);
  }
};

export default authValidator;
