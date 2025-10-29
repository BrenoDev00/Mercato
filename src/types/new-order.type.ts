import { Order } from "@prisma/client";
import { OrderProduct } from "./order-product.type.js";

export interface NewOrder
  extends Omit<Order, "id" | "status" | "totalInCents"> {
  products: OrderProduct[];
}
