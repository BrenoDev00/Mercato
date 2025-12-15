import { Login } from "../types/login.type.js";
import { IAuthService } from "../types/services/auth-service.type.js";
import UserRepository from "../repositories/user-repository.js";
import bcrypt, { hash } from "bcrypt";
import UserAddressRepository from "../repositories/user-address-repository.js";
import {
  EMAIL_ALREADY_IN_USE,
  INVALID_USER_CREDENTIALS,
  ROLE_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import pkg from "jsonwebtoken";
import { User } from "@prisma/client";
import { NewUser } from "../types/new-user.type.js";
import RoleRepository from "../repositories/role-repository.js";

class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userAddressRepository: UserAddressRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  async register(userData: NewUser): Promise<User> {
    const { name, email, password, roleId } = userData;

    const userCredentials = await this.userRepository.findCredentialsByEmail(
      email
    );

    if (userCredentials?.email) {
      throw new Error(EMAIL_ALREADY_IN_USE);
    }

    const searchedRoleId = await this.roleRepository.findRoleId(roleId);

    if (!searchedRoleId) throw new Error(ROLE_NOT_FOUND);

    const encryptedPassword = await hash(password, 12);

    const addressId = await this.userAddressRepository.create(userData.address);

    const registeredUser = await this.userRepository.create({
      name,
      email,
      roleId,
      password: encryptedPassword,
      addressId,
    });

    return registeredUser;
  }

  async login(loginData: Login): Promise<{ accessToken: string }> {
    const userCredentialsData =
      await this.userRepository.findCredentialsByEmail(loginData.email);

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

export default AuthService;
