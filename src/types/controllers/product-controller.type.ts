import { Request, Response } from "express";

export interface IProductController {
  getProducts(_: Request, res: Response): Promise<Response>;

  addProduct(req: Request, res: Response): Promise<Response>;

  // editProduct(req: Request, res: Response): Promise<Response>;

  deleteProduct(req: Request, res: Response): Promise<Response>;
}
