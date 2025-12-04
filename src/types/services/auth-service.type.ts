import { User } from "@prisma/client";
import { Login } from "../login.type.js";
import { NewUser } from "../new-user.type.js";

export interface IAuthService {
  register(userData: NewUser): Promise<User>;

  login(userCredentials: Login): Promise<{ accessToken: string }>;
}
