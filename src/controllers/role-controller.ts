/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IRoleController } from "../types/controllers/role-controller.type.js";
import roleService from "../services/role-service.js";
import { ROLE_NOT_FOUND } from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import InternalError from "../utils/errors/internal-error.js";

class RoleController implements IRoleController {
  async updateRoleById(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;

    try {
      const role = await roleService.updateRoleById({ ...body, id: id });

      return res.status(200).send(role);
    } catch (error: any) {
      if (error.message === ROLE_NOT_FOUND)
        throw new NotFoundError(ROLE_NOT_FOUND);

      throw new InternalError();
    }
  }
}

const roleController = new RoleController();

export default roleController;
