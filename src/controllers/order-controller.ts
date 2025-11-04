/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IOrderController } from "../types/controllers/order-controller.type.js";
import orderService from "../services/order-service.js";
import { StatusCode } from "../types/status-code.type.js";
import {
  ERROR_ADDING_ORDER,
  PRODUCT_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import InternalError from "../utils/errors/internal-error.js";
import UnavailableError from "../utils/errors/unavailable-error.js";

class OrderController implements IOrderController {
  async addOrder(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
      const paymentUrl = await orderService.addOrder(body);

      return res.status(StatusCode.CREATED).send({ paymentUrl: paymentUrl });
    } catch (error: any) {
      if (error.message === USER_NOT_FOUND)
        throw new NotFoundError(USER_NOT_FOUND);

      if (error.message === PRODUCT_NOT_FOUND)
        throw new NotFoundError(PRODUCT_NOT_FOUND);

      if (error.message === ERROR_ADDING_ORDER)
        throw new UnavailableError(ERROR_ADDING_ORDER);

      throw new InternalError();
    }
  }

  async getMercadoPagoWebhookResponse(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await orderService.updateOrder(req);

      return res.status(StatusCode.OK).send();
    } catch {
      throw new InternalError();
    }
  }

  async getOrdersInfo(_: Request, res: Response): Promise<Response> {
    try {
      const ordersInfo = await orderService.getOrdersInfo();

      return res.status(StatusCode.OK).send(ordersInfo);
    } catch {
      throw new InternalError();
    }
  }
}

const orderController = new OrderController();

export default orderController;
