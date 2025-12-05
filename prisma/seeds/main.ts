import { PrismaClient } from "@prisma/client";
import { seedRoles } from "../seeds/seed-roles.js";

const main = async (): Promise<void> => {
  const prisma = new PrismaClient();

  await seedRoles(prisma);
};

main()
  .then(() => console.log("\nSeeds finalizados com sucesso."))
  .catch((error) => console.error("\nErro durante os seeds: ", error));
