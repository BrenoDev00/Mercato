import { UserAddress } from "@prisma/client";
import { prisma } from "../config/prisma-client.js";
import { IUserAddressRepository } from "../types/repositories/user-address-repository.type.js";

class UserAddressRepository implements IUserAddressRepository {
  async addUserAddress(addressData: Omit<UserAddress, "id">): Promise<string> {
    const addedAddress = await prisma.userAddress.create({
      data: addressData,
    });

    return addedAddress.id;
  }
}

const userAddressRepository = new UserAddressRepository();

export default userAddressRepository;
