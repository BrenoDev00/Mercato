import { User } from "@prisma/client";
import { Login } from "../login.type.js";

export interface IAuthService {
  register(userData: Omit<User, "id">): Promise<User>;

  login(userCredentials: Login): Promise<{ accessToken: string }>;
}
