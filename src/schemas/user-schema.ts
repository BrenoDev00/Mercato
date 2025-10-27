import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3).max(64),
  email: z.email(),
  password: z.string().min(12).max(12),
  roleId: z.uuid(),
});

export default userSchema;
