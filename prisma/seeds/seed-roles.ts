import { PrismaClient } from "@prisma/client";
import { roleDtos } from "./dtos/role-dtos.js";

export const seedRoles = async (prisma: PrismaClient): Promise<void> => {
  try {
    for (const role of roleDtos) {
      await prisma.role.upsert({
        where: { id: role.id },
        update: {},
        create: role,
      });
    }

    console.log("\nPermissões adicionadas com sucesso ✅");
  } catch (error) {
    console.error("Erro ao adicionar permissões ❌: ", error);
  }
};
