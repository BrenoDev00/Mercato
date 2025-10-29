import { NewOrder } from "../new-order.type.js";

export interface IOrderService {
  addOrder(orderData: NewOrder): Promise<string>;
}
