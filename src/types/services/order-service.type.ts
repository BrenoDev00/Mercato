import { Request } from "express";
import { NewOrder } from "../new-order.type.js";

export interface IOrderService {
  addOrder(orderData: NewOrder): Promise<string>;

  handleHmackVerification(req: Request): Promise<void>;
}
