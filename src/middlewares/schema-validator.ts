import z, { ZodObject } from "zod";
import { Response, Request, NextFunction } from "express";
import BadRequestError from "../utils/errors/bad-request-error.js";

const schemaValidator = (schema: ZodObject) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrorsMessage = z.prettifyError(validation.error);

      throw new BadRequestError(formattedErrorsMessage);
    }

    next();
  };
};

export default schemaValidator;
