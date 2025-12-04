import { UserAddress } from "@prisma/client";

export interface IUserAddressRepository {
  addUserAddress(addressData: Omit<UserAddress, "id">): Promise<string>;
}
