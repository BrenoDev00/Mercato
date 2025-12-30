import { Request } from "express";
import { NewOrder } from "../new-order.type.js";
import { OrdersInfoResponse } from "../orders-info-response.type.js";

export interface IOrderService {
  create(orderData: NewOrder): Promise<string>;

  update(req: Request): Promise<void>;

  listOrdersInfo(): Promise<OrdersInfoResponse>;
}
