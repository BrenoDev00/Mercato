import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3).max(84),
  description: z.string().min(3),
  priceInCents: z.number().min(0.01),
  productCategoriesId: z.array(z.uuid()),
});

export default productSchema;
