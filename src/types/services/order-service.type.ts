import { Request } from "express";
import { NewOrder } from "../new-order.type.js";

export interface IOrderService {
  addOrder(orderData: NewOrder): Promise<string>;

  updateOrder(req: Request): Promise<void>;
}
