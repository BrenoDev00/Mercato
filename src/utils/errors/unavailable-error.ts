import { StatusCode } from "../../types/status-code.type.js";
import BaseError from "./base-error.js";

class UnavailableError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.UNAVAILABLE);
  }
}

export default UnavailableError;
