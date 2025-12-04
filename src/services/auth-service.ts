import { Login } from "../types/login.type.js";
import { IAuthService } from "../types/services/auth-service.type.js";
import userRepository from "../repositories/user-repository.js";
import bcrypt, { hash } from "bcrypt";
import roleService from "./role-service.js";
import userAddressRepository from "../repositories/user-address-repository.js";
import {
  EMAIL_ALREADY_IN_USE,
  INVALID_USER_CREDENTIALS,
  ROLE_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import pkg from "jsonwebtoken";
import { User } from "@prisma/client";
import { NewUser } from "../types/new-user.type.js";

class AuthService implements IAuthService {
  async register(userData: NewUser): Promise<User> {
    const { name, email, password, roleId } = userData;

    const userCredentials = await userRepository.getUserCredentialsByEmail(
      email
    );

    if (userCredentials?.email) {
      throw new Error(EMAIL_ALREADY_IN_USE);
    }

    const searchedRoleId = await roleService.getRoleId(roleId);

    if (!searchedRoleId) throw new Error(ROLE_NOT_FOUND);

    const encryptedPassword = await hash(password, 12);

    const addressId = await userAddressRepository.addUserAddress(
      userData.address
    );

    const registeredUser = await userRepository.addUser({
      name,
      email,
      roleId,
      password: encryptedPassword,
      addressId,
    });

    return registeredUser;
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
