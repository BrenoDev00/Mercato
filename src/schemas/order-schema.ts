import z from "zod";
import { PaymentMethod } from "../types/payment-method.js";

const orderSchema = z.object({
  userId: z.uuid(),
  paymentMethod: z.enum(PaymentMethod),
  products: z.array(
    z.object({
      id: z.uuid(),
      quantity: z.int().min(1),
    })
  ),
  totalInCents: z.int().min(1),
});

export default orderSchema;
