import { User } from "@prisma/client";

export const userDtos: User[] = [
  {
    id: "12ae4e63-e0d0-400a-b64a-88258e2de003",
    name: "Maria Eduarda Souza",
    email: "maria@mail.com",
    status: true,
    password:
      "001a191664f43d3484198c4574d660f18284f6591f37b919facd82cf3e8bf80e",
    roleId: "04b931e2-bf5d-4c27-96e0-828e11800e39",
    addressId: "6aa6f70c-aea9-435b-adec-39e30989b427",
  },
  {
    id: "449d786f-8bac-4224-afa1-2312d3d551bd",
    name: "Leandro Carlos Alberto",
    email: "leandro@mail.com",
    status: false,
    password:
      "10e9f239e3523081b76c3b71e26bf1c29d8d6e5dc11583a0bba534bf8cbc338a",
    roleId: "887a29e3-b4ed-4e6a-8dd8-125e6efd365c",
    addressId: "4de503b2-c7a8-44f3-9efc-2d55796625fc",
  },
  {
    id: "0da176df-9a0d-4baa-b1a7-cbf8137b5a45",
    name: "Carlos Augusto Ferreira",
    email: "carlos@mail.com",
    status: true,
    password:
      "7b85175b455060e3237e925f023053ca9515e8682a83c8b09911c724a1f8b75f",
    roleId: "d54d2243-df4f-4df6-ac7a-71d799f3760c",
    addressId: "842be897-2cbd-4172-807d-eedcb0db2326",
  },
];
