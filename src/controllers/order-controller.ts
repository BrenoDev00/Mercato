/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IOrderController } from "../types/controllers/order-controller.type.js";
import orderService from "../services/order-service.js";
import { StatusCode } from "../types/status-code.type.js";
import {
  ORDER_SUCCESSFULLY_ADDED,
  PRODUCT_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import InternalError from "../utils/errors/internal-error.js";

class OrderController implements IOrderController {
  async addOrder(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
      await orderService.addOrder(body);

      return res
        .status(StatusCode.CREATED)
        .send({ message: ORDER_SUCCESSFULLY_ADDED });
    } catch (error: any) {
      if (error.message === USER_NOT_FOUND)
        throw new NotFoundError(USER_NOT_FOUND);

      if (error.message === PRODUCT_NOT_FOUND)
        throw new NotFoundError(PRODUCT_NOT_FOUND);

      throw new InternalError();
    }
  }
}

const orderController = new OrderController();

export default orderController;
