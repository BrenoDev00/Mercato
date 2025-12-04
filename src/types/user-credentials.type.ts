import { Login } from "./login.type.js";

export interface UserCredentials extends Login {
  id: string;
}
