import { Role } from "@prisma/client";
import { prisma } from "../config/prisma-client.js";
import { IRoleRepository } from "../types/repositories/role-repository.type.js";

class RoleRepository implements IRoleRepository {
  async getRoleId(id: string): Promise<{ id: string } | null> {
    const roleId = await prisma.role.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });

    return roleId;
  }

  async updateRoleById(roleData: Role): Promise<Role | null> {
    const role = await prisma.role.update({
      where: {
        id: roleData.id,
      },
      data: roleData,
    });

    return role;
  }
}

const roleRepository = new RoleRepository();

export default roleRepository;
