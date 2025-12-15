import { UserById } from "../user-by-id.type.js";

export interface IUserService {
  getById(id: string): Promise<UserById>;

  updateStatus(id: string, status: boolean): Promise<void>;
}
