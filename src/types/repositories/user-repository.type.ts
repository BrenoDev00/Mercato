import { User } from "@prisma/client";
import { UserCredentials } from "../user-credentials.type.js";
import { UserById } from "../user-by-id.type.js";

export interface IUserRepository {
  getUserById(id: string): Promise<UserById | null>;

  getUserCredentialsByEmail(email: string): Promise<UserCredentials | null>;

  addUser(userData: Omit<User, "id" | "status">): Promise<User>;

  changeUserStatus(id: string, status: boolean): Promise<void>;
}
