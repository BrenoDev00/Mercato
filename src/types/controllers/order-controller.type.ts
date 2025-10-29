import { Request, Response } from "express";

export interface IOrderController {
  addOrder(req: Request, res: Response): Promise<Response>;

  getWebhookResponse(req: Request, res: Response): Promise<Response>;
}
