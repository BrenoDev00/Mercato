import { PrismaClient } from "@prisma/client";
import { seedRoles } from "../seeds/seed-roles.js";
import { seedUserAddresses } from "./seed-user-addresses.js";
import { seedUsers } from "./seed-users.js";

const main = async (): Promise<void> => {
  const prisma = new PrismaClient();

  await seedRoles(prisma);
  await seedUserAddresses(prisma);
  await seedUsers(prisma);
};

main()
  .then(() => console.log("\nSeeds finalizados com sucesso."))
  .catch((error) => console.error("\nErro durante os seeds: ", error));
