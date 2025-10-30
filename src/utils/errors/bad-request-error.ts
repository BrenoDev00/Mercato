import { StatusCode } from "../../types/status-code.type.js";
import BaseError from "./base-error.js";

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export default BadRequestError;
