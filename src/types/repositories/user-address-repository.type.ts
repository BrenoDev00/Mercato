import { UserAddress } from "@prisma/client";

export interface IUserAddressRepository {
  create(addressData: Omit<UserAddress, "id">): Promise<string>;
}
