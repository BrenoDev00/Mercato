import { z } from "zod";
import { userAddressSchema } from "./user-address-schema.js";

const userSchema = z.object({
  name: z.string().min(3).max(64),
  email: z.email(),
  password: z.string().min(12).max(12),
  roleId: z.uuid(),
  address: userAddressSchema,
});

export default userSchema;
