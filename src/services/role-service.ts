import { IRoleService } from "../types/services/role-service.type.js";
import { Role } from "@prisma/client";
import { ROLE_NOT_FOUND } from "../utils/constants.js";
import RoleRepository from "../repositories/role-repository.js";

class RoleService implements IRoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async updateRole(roleData: Role): Promise<Role | null> {
    const searchedRole = await this.roleRepository.findRoleId(roleData.id);

    if (!searchedRole) throw new Error(ROLE_NOT_FOUND);

    const role = await this.roleRepository.updateRole(roleData);

    return role;
  }
}

export default RoleService;
