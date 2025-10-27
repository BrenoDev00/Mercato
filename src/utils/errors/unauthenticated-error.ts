import BaseError from "./base-error.js";
import { StatusCode } from "../../types/status-code.type.js";

class UnauthenticatedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.UNAUTHENTICATED);
  }
}

export default UnauthenticatedError;
