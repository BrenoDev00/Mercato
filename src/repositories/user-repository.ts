import { User } from "@prisma/client";
import { prisma } from "../config/prisma-client.js";
import { IUserRepository } from "../types/repositories/user-repository.type.js";
import { UserCredentials } from "../types/user-credentials.js";
import { UserById } from "../types/user-by-id.type.js";

class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<UserById | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return user;
  }

  async getUserCredentialsByEmail(
    email: string
  ): Promise<UserCredentials | null> {
    const userCredentials = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: { id: true, email: true, password: true },
    });

    return userCredentials;
  }

  async addUser(userData: Omit<User, "id">): Promise<User> {
    const user = await prisma.user.create({ data: userData });

    return user;
  }

  async changeUserStatus(id: string, status: boolean): Promise<void> {
    await prisma.user.update({
      data: {
        status: status,
      },
      where: {
        id: id,
      },
    });
  }
}

const userRepository = new UserRepository();

export default userRepository;
