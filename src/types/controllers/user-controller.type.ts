import { Response, Request } from "express";

export interface IUserController {
  getUser(req: Request, res: Response): Promise<Response>;

  patchStatus(req: Request, res: Response): Promise<Response>;
}
