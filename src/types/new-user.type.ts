import { UserAddress } from "@prisma/client";

export type NewUser = {
  name: string;
  email: string;
  password: string;
  roleId: string;
  address: Omit<UserAddress, "id">;
};
