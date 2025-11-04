import { Request, Response } from "express";

export interface IOrderController {
  addOrder(req: Request, res: Response): Promise<Response>;

  getMercadoPagoWebhookResponse(req: Request, res: Response): Promise<Response>;
}
