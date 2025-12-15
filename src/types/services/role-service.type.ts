import { Role } from "@prisma/client";

export interface IRoleService {
  updateRoleById(roleData: Role): Promise<Role | null>;
}
