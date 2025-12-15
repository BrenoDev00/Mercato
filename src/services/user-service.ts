import { IUserService } from "../types/services/user-service.type.js";
import { USER_NOT_FOUND } from "../utils/constants.js";
import { UserById } from "../types/user-by-id.type.js";
import UserRepository from "../repositories/user-repository.js";

class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: string): Promise<UserById> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new Error(USER_NOT_FOUND);

    return user;
  }

  async updateStatus(id: string, status: boolean): Promise<void> {
    const searchedUser = await this.userRepository.findById(id);

    if (!searchedUser) throw new Error(USER_NOT_FOUND);

    await this.userRepository.updateStatus(id, status);
  }
}

export default UserService;
