import { z } from "zod";
import { Role } from "../types/role.type.js";

const roleSchema = z.object({
  name: z.enum([Role.ADMIN, Role.EDITOR, Role.USER]),
  description: z.string(),
  status: z.boolean(),
});

export default roleSchema;
