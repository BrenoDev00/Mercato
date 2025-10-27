import { Response, Request } from "express";

export interface IUserController {
  getUserById(req: Request, res: Response): Promise<Response>;

  changeUserStatus(req: Request, res: Response): Promise<Response>;
}
