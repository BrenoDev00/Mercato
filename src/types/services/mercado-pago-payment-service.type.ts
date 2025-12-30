import { Request } from "express";
import { OrderProduct } from "../order-product.type.js";

export interface IMercadoPagoPaymentService {
  setPreference(productsList: OrderProduct[]): Promise<string | undefined>;

  handleHmackVerification(req: Request): Promise<string | undefined>;
}
