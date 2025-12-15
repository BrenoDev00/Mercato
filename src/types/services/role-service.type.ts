import { Role } from "@prisma/client";

export interface IRoleService {
  updateRole(roleData: Role): Promise<Role | null>;
}
