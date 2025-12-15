import { Response, Request } from "express";

export interface IRoleController {
  putRole(req: Request, res: Response): Promise<Response>;
}
