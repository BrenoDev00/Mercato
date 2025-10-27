import loginSchema from "../schemas/login-schema.js";
import { z } from "zod";

export type Login = z.infer<typeof loginSchema>;
