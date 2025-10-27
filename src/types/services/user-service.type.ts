import { UserById } from "../user-by-id.type.js";

export interface IUserService {
  getUserById(id: string): Promise<UserById>;

  changeUserStatus(id: string, status: boolean): Promise<void>;
}
