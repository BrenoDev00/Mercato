import { StatusCode } from "../../types/status-code.type.js";
import { INTERNAL_SERVER_ERROR } from "../constants.js";
import BaseError from "./base-error.js";

class InternalError extends BaseError {
  constructor() {
    super(INTERNAL_SERVER_ERROR, StatusCode.INTERNAL_ERROR);
  }
}

export default InternalError;
