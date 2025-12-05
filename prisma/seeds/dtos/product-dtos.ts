import { Product } from "@prisma/client";

export const productDtos: Product[] = [
  {
    id: "73d99a39-8ba8-43fe-b5df-b7cfb757d2d6",
    name: "Refrigerante Guaraná 2L",
    description: "Refrigerante Guaraná 2L da marca tal.",
    priceInCents: 750,
    createdAt: new Date(),
  },
  {
    id: "8e227c83-d74e-426c-b7ed-946c979ba1a1",
    name: "Sandália Tamanho 32",
    description: "Sandália da marca tal tamanho 32.",
    priceInCents: 1220,
    createdAt: new Date(),
  },
  {
    id: "a454ff23-663b-455b-97e8-0c12446389e1",
    name: "Sérum limpeza de pele",
    description: "Sérum limpeza de pele da marca tal.",
    priceInCents: 3200,
    createdAt: new Date(),
  },
];
