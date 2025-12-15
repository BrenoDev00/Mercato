import { Request, Response } from "express";

export interface IAuthController {
  postRegister(req: Request, res: Response): Promise<Response>;

  postLogin(req: Request, res: Response): Promise<Response>;
}
