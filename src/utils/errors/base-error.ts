import { StatusCode } from "../../types/status-code.type.js";

abstract class BaseError extends Error {
  readonly statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);

    this.statusCode = statusCode;
  }
}

export default BaseError;
