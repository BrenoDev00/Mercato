import { User } from "@prisma/client";
import { UserCredentials } from "../user-credentials.type.js";
import { UserById } from "../user-by-id.type.js";

export interface IUserRepository {
  findById(id: string): Promise<UserById | null>;

  findCredentialsByEmail(email: string): Promise<UserCredentials | null>;

  create(userData: Omit<User, "id" | "status">): Promise<User>;

  changeStatus(id: string, status: boolean): Promise<void>;
}
