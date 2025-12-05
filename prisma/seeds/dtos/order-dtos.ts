import { Order } from "@prisma/client";
import { OrderStatus } from "../../../src/types/order-status.type.js";

export const orderDtos: Order[] = [
  {
    id: "e23abb8e-588e-448d-bd7c-1c632c6e28f7",
    status: OrderStatus.APPROVED,
    totalInCents: 2250,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "12ae4e63-e0d0-400a-b64a-88258e2de003",
  },
  {
    id: "633f02ad-1317-4186-a110-bc00766e3f01",
    status: OrderStatus.PENDING,
    totalInCents: 2440,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "449d786f-8bac-4224-afa1-2312d3d551bd",
  },
  {
    id: "dd0f6ca0-a3a5-4bf2-b11f-9c2955ff9536",
    status: OrderStatus.REJECTED,
    totalInCents: 6400,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "0da176df-9a0d-4baa-b1a7-cbf8137b5a45",
  },
];
