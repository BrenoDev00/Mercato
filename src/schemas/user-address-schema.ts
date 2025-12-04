import z from "zod";
import { CEP_REGEX } from "../utils/constants.js";

export const userAddressSchema = z.object({
  cep: z.string().min(9).max(9).regex(CEP_REGEX),
  street: z.string().min(3).max(64),
  number: z.number().int().min(1),
  additionalInformation: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
});
