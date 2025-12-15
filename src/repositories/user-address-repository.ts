import { UserAddress } from "@prisma/client";
import { prisma } from "../config/prisma-client.js";
import { IUserAddressRepository } from "../types/repositories/user-address-repository.type.js";

class UserAddressRepository implements IUserAddressRepository {
  async create(addressData: Omit<UserAddress, "id">): Promise<string> {
    const createdAddress = await prisma.userAddress.create({
      data: addressData,
    });

    return createdAddress.id;
  }
}

export default UserAddressRepository;
