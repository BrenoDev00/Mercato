import { IRoleService } from "../types/services/role-service.type.js";
import roleRepository from "../repositories/role-repository.js";
import { Role } from "@prisma/client";
import { ROLE_NOT_FOUND } from "../utils/constants.js";

class RoleService implements IRoleService {
  async getRoleId(id: string): Promise<{ id: string } | null> {
    const roleId = await roleRepository.getRoleId(id);

    return roleId;
  }

  async updateRoleById(roleData: Role): Promise<Role | null> {
    const searchedRole = await roleRepository.getRoleId(roleData.id);

    if (!searchedRole) throw new Error(ROLE_NOT_FOUND);

    const role = await roleRepository.updateRoleById(roleData);

    return role;
  }
}

const roleService = new RoleService();

export default roleService;
