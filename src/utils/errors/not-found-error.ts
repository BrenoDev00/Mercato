import { StatusCode } from "../../types/status-code.type.js";
import BaseError from "./base-error.js";

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.NOT_FOUND);
  }
}

export default NotFoundError;
