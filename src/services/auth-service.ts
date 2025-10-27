import { Login } from "../types/login.type.js";
import { IAuthService } from "../types/services/auth-service.type.js";
import userRepository from "../repositories/user-repository.js";
import bcrypt, { hash } from "bcrypt";
import roleService from "./role-service.js";
import {
  EMAIL_ALREADY_IN_USE,
  INVALID_USER_CREDENTIALS,
  ROLE_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import pkg from "jsonwebtoken";
import { User } from "@prisma/client";

class AuthService implements IAuthService {
  async register(userData: Omit<User, "id">): Promise<User> {
    const userCredentials = await userRepository.getUserCredentialsByEmail(
      userData.email
    );

    if (userCredentials?.email) {
      throw new Error(EMAIL_ALREADY_IN_USE);
    }

    const roleId = await roleService.getRoleId(userData.roleId);

    if (!roleId) throw new Error(ROLE_NOT_FOUND);

    const encryptedPassword = await hash(userData.password, 12);

    const user = await userRepository.addUser({
      ...userData,
      password: encryptedPassword,
    });

    return user;
  }

  async login(loginData: Login): Promise<{ accessToken: string }> {
    const userCredentialsData = await userRepository.getUserCredentialsByEmail(
      loginData.email
    );

    if (!userCredentialsData) throw new Error(USER_NOT_FOUND);

    const samePasswords = await bcrypt.compare(
      loginData.password,
      userCredentialsData.password
    );

    if (!samePasswords) throw new Error(INVALID_USER_CREDENTIALS);

    const { sign } = pkg;

    const accessToken = sign(
      {
        id: userCredentialsData.id,
        email: userCredentialsData.email,
      },
      process.env.HASH_SECRET as string,
      {
        expiresIn: 86400, // 1 dia
      }
    );

    return { accessToken };
  }
}

const authService = new AuthService();

export default authService;
