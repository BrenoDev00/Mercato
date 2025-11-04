export type OrdersInfo = {
  id: string;
  status: string;
  totalInCents: number;
  createdAt: Date;
  updatedAt: Date | null;
  ordersOnProducts: {
    quantity: number;
    product: {
      name: string;
      id: string;
      priceInCents: number;
      categoriesOnProducts: {
        category: {
          name: string;
          id: string;
        };
      }[];
    };
  }[];
  user: {
    name: string;
    id: string;
  };
}[];
