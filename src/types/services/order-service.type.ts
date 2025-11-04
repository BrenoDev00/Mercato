import { Request } from "express";
import { NewOrder } from "../new-order.type.js";
import { OrdersInfoResponse } from "../orders-info-response.type.js";

export interface IOrderService {
  addOrder(orderData: NewOrder): Promise<string>;

  updateOrder(req: Request): Promise<void>;

  getOrdersInfo(): Promise<OrdersInfoResponse>;
}
