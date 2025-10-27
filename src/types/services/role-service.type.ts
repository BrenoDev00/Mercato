import { Role } from "@prisma/client";

export interface IRoleService {
  getRoleId(id: string): Promise<{ id: string } | null>;

  updateRoleById(roleData: Role): Promise<Role | null>;
}
