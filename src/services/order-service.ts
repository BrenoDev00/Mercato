import { NewOrder } from "../types/new-order.type.js";
import { IOrderService } from "../types/services/order-service.type.js";
import orderRepository from "../repositories/order-repository.js";
import userRepository from "../repositories/user-repository.js";
import {
  BASE_MERCADO_PAGO_API_URL,
  ERROR_ADDING_ORDER,
  HMAC_VERIFICATION_FAILED,
  PRODUCT_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import ordersOnProductsRepository from "../repositories/orders-on-products-respository.js";
import productRepository from "../repositories/product-repository.js";
import { OrderProduct } from "../types/order-product.type.js";
import { Preference } from "mercadopago";
import { client } from "../config/mercado-pago-client.js";
import { Request } from "express";
import crypto from "node:crypto";

class OrderService implements IOrderService {
  private orderId: string = "";

  private calculateTotalInCents(productsList: OrderProduct[]): number {
    const calculatedTotal = productsList.reduce(
      (sum, item) => sum + item.priceInCents * item.quantity,
      0
    );

    return calculatedTotal;
  }

  private async handleMercadoPagoPreference(
    productsList: OrderProduct[]
  ): Promise<{ paymentUrl: string | undefined }> {
    const preference = new Preference(client);

    const productItems = productsList.map((product) => {
      return {
        id: product.id,
        title: product.title,
        quantity: product.quantity,
        unit_price: product.priceInCents / 100,
      };
    });

    const preferenceResponse = await preference.create({
      body: {
        items: productItems,
        notification_url: process.env.MERCADO_PAGO_NOTIFICATION_URL,
        payment_methods: {
          excluded_payment_types: [{ id: "ticket" }],
        },
      },
    });

    return {
      paymentUrl: preferenceResponse.init_point,
    };
  }

  async addOrder(orderData: NewOrder): Promise<string> {
    const { userId, products } = orderData;

    const searchedUser = await userRepository.getUserById(userId);

    if (!searchedUser) throw new Error(USER_NOT_FOUND);

    for (const product of products) {
      const searchedProductId = await productRepository.getProductId(
        product.id
      );

      if (!searchedProductId) {
        throw new Error(PRODUCT_NOT_FOUND);
      }
    }

    const preferenceResponse = await this.handleMercadoPagoPreference(products);

    const { paymentUrl } = preferenceResponse;

    if (!paymentUrl) throw new Error(ERROR_ADDING_ORDER);

    const totalInCents = this.calculateTotalInCents(products);

    const orderId = await orderRepository.addOrder({
      userId,
      totalInCents,
    });

    for (const product of products) {
      const { id, quantity } = product;

      await ordersOnProductsRepository.addOrderOnProduct({
        productId: id,
        orderId,
        quantity,
      });
    }

    this.orderId = orderId;

    return paymentUrl;
  }

  private async updateOrder(paymentId: string): Promise<void> {
    const paymentUrl = `${BASE_MERCADO_PAGO_API_URL}/payments/${paymentId}`;

    let paymentResponse;

    try {
      const request = await fetch(paymentUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      });

      paymentResponse = await request.json();
    } catch (error) {
      throw new Error("payment request error: " + error);
    }

    if (paymentResponse) {
      const { status, date_last_updated } = paymentResponse;

      await orderRepository.updateOrderById(this.orderId, {
        status,
        updatedAt: date_last_updated,
      });
    }
  }

  async handleHmackVerification(req: Request): Promise<void> {
    const { headers, body } = req;

    const xSignature = headers["x-signature"] as string;
    const xRequestId = headers["x-request-id"] as string;

    const dataID = req.query["data.id"];

    const parts = xSignature.split(",");

    if (body.type !== "payment" || !dataID) {
      return;
    }

    let ts;
    let hash;

    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === "ts") {
          ts = trimmedValue;
        } else if (trimmedKey === "v1") {
          hash = trimmedValue;
        }
      }
    });

    const secret = process.env.MERCADO_PAGO_SECRET_KEY as string;

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(manifest);

    const sha = hmac.digest("hex");

    if (sha != hash) {
      throw new Error(HMAC_VERIFICATION_FAILED);
    }

    await this.updateOrder(dataID as string);
  }
}

const orderService = new OrderService();

export default orderService;
