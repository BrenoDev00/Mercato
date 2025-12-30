/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IOrderController } from "../types/controllers/order-controller.type.js";
import { StatusCode } from "../types/status-code.type.js";
import {
  ERROR_ADDING_ORDER,
  PRODUCT_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import InternalError from "../utils/errors/internal-error.js";
import UnavailableError from "../utils/errors/unavailable-error.js";
import OrderService from "../services/order-service.js";

class OrderController implements IOrderController {
  constructor(private readonly orderService: OrderService) {}

  async postOrder(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
      const paymentUrl = await this.orderService.create(body);

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
      await this.orderService.update(req);

      return res.status(StatusCode.OK).send();
    } catch {
      throw new InternalError();
    }
  }

  async getOrdersInfo(_: Request, res: Response): Promise<Response> {
    try {
      const ordersInfo = await this.orderService.listOrdersInfo();

      return res.status(StatusCode.OK).send(ordersInfo);
    } catch {
      throw new InternalError();
    }
  }
}

export default OrderController;
