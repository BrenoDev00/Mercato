import { PrismaClient } from "@prisma/client";
import { userDtos } from "./dtos/user-dtos.js";

export const seedUsers = async (prisma: PrismaClient): Promise<void> => {
  try {
    for (const user of userDtos) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
    }

    console.log("\nUsuários adicionados com sucesso ✅");
  } catch (error) {
    console.error("Erro ao adicionar usuários ❌", error);
  }
};
