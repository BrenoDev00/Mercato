export type UserById = {
  id: string;
  name: string;
  email: string;
  status: boolean;
  role: {
    id: string;
    name: string;
  };
};
