import { Role } from "@prisma/client";

export interface IRoleRepository {
  findRoleId(id: string): Promise<{ id: string } | null>;

  updateRoleById(roleData: Role): Promise<Role | null>;
}
