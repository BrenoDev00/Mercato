import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(12).max(12),
});

export default loginSchema;
