import { PrismaClient } from "@prisma/client";
import { seedRoles } from "./seed-roles.js";
import { seedUserAddresses } from "./seed-user-addresses.js";
import { seedUsers } from "./seed-users.js";
import { seedProducts } from "./seed-products.js";
import { seedProductCategories } from "./seed-product-categories.js";

const executeSeeds = async (): Promise<void> => {
  const prisma = new PrismaClient();

  await seedRoles(prisma);
  await seedUserAddresses(prisma);
  await seedUsers(prisma);
  await seedProducts(prisma);
  await seedProductCategories(prisma);
};

executeSeeds()
  .then(() => console.log("\nSeeds finalizados com sucesso."))
  .catch((error) => console.error("\nErro durante os seeds: ", error));
