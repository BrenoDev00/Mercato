import z from "zod";

const orderSchema = z.object({
  userId: z.uuid(),
  products: z.array(
    z.object({
      id: z.uuid(),
      title: z.string().max(164).min(1),
      quantity: z.int().min(1),
      priceInCents: z.int().min(1),
    })
  ),
});

export default orderSchema;
