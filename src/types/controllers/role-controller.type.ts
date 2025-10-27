import { Response, Request } from "express";

export interface IRoleController {
  updateRoleById(req: Request, res: Response): Promise<Response>;
}
