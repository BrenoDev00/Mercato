import { StatusCode } from "../../types/status-code.type.js";
import BaseError from "./base-error.js";

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.FORBIDDEN);
  }
}

export default UnauthorizedError;
