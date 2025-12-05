import { PrismaClient } from "@prisma/client";
import { userAddressDtos } from "./dtos/user-address-dtos.js";

export const seedUserAddresses = async (
  prisma: PrismaClient
): Promise<void> => {
  try {
    for (const userAddress of userAddressDtos) {
      await prisma.userAddress.upsert({
        where: { id: userAddress.id },
        update: {},
        create: userAddress,
      });
    }

    console.log("Endereços de usuários adicionados ✅");
  } catch (error) {
    console.error("Erro ao adicionar endereços de usuários ❌", error);
  }
};
