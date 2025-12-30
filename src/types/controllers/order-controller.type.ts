import { Request, Response } from "express";

export interface IOrderController {
  postOrder(req: Request, res: Response): Promise<Response>;

  getMercadoPagoWebhookResponse(req: Request, res: Response): Promise<Response>;

  getOrdersInfo(_: Request, res: Response): Promise<Response>;
}
