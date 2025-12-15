import { UserById } from "../user-by-id.type.js";

export interface IUserService {
  listById(id: string): Promise<UserById>;

  updateStatusById(id: string, status: boolean): Promise<void>;
}
