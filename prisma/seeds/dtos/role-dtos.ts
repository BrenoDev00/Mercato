import { Role } from "@prisma/client";
import { Role as RoleEnum } from "../../../src/types/role.type.js";

export const roleDtos: Role[] = [
  {
    id: "d54d2243-df4f-4df6-ac7a-71d799f3760c",
    status: true,
    name: RoleEnum.USER,
    description: "Pode pesquisar produtos e realizar compras.",
  },
  {
    id: "04b931e2-bf5d-4c27-96e0-828e11800e39",
    status: true,
    name: RoleEnum.ADMIN,
    description: "Pode realizar qualquer tipo de ação.",
  },
  {
    id: "887a29e3-b4ed-4e6a-8dd8-125e6efd365c",
    status: true,
    name: RoleEnum.EDITOR,
    description:
      "Pode cadastrar produtos, pesquisar produtos e obter informações de usuários.",
  },
];
