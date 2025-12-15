/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IRoleController } from "../types/controllers/role-controller.type.js";
import { ROLE_NOT_FOUND } from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import InternalError from "../utils/errors/internal-error.js";
import RoleService from "../services/role-service.js";

class RoleController implements IRoleController {
  constructor(private readonly roleService: RoleService) {}

  async putRole(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;

    try {
      const role = await this.roleService.updateRole({ ...body, id: id });

      return res.status(200).send(role);
    } catch (error: any) {
      if (error.message === ROLE_NOT_FOUND)
        throw new NotFoundError(ROLE_NOT_FOUND);

      throw new InternalError();
    }
  }
}

export default RoleController;
