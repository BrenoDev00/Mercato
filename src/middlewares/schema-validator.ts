import z, { ZodObject } from "zod";
import { Response, Request, NextFunction } from "express";
import { StatusCode } from "../types/status-code.type.js";

const schemaValidator = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrorsMessage = z.prettifyError(validation.error);

      return res.status(StatusCode.BAD_REQUEST).send(formattedErrorsMessage);
    }

    next();
  };
};

export default schemaValidator;
