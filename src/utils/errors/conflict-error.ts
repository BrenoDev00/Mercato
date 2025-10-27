import BaseError from "./base-error.js";
import { StatusCode } from "../../types/status-code.type.js";

class ConflictError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.CONFLICT);
  }
}

export default ConflictError;
