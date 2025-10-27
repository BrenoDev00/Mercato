import { Role } from "@prisma/client";

export interface IRoleRepository {
  getRoleId(id: string): Promise<{ id: string } | null>;

  updateRoleById(roleData: Role): Promise<Role | null>;
}
