import { Request, Response } from "express";

export interface IProductController {
  getProducts(_: Request, res: Response): Promise<Response>;

  postProduct(req: Request, res: Response): Promise<Response>;

  putProduct(req: Request, res: Response): Promise<Response>;

  deleteProduct(req: Request, res: Response): Promise<Response>;
}
