import { UserAddress } from "@prisma/client";

export const userAddressDtos: UserAddress[] = [
  {
    id: "6aa6f70c-aea9-435b-adec-39e30989b427",
    number: 23,
    cep: "55678-678",
    street: "Rual Tal",
    additionalInformation: null,
    city: "Cidade Tal",
    state: "SP",
    country: "Brasil",
  },
  {
    id: "4de503b2-c7a8-44f3-9efc-2d55796625fc",
    number: 256,
    cep: "55678-678",
    street: "Rual Tal",
    additionalInformation: "complemento tal",
    city: "Cidade Tal",
    state: "DF",
    country: "Brasil",
  },
  {
    id: "842be897-2cbd-4172-807d-eedcb0db2326",
    number: 111,
    cep: "34678-678",
    street: "Rual Tal",
    additionalInformation: null,
    city: "Cidade Tal",
    state: "GO",
    country: "Brasil",
  },
];
