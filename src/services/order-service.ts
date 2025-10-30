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
import { PreferenceResponseData } from "../types/preference-response.type.js";

class OrderService implements IOrderService {
  private paymentId!: string;

  private calculateTotalInCents(productsList: OrderProduct[]): number {
    const calculatedTotal = productsList.reduce(
      (sum, item) => sum + item.priceInCents * item.quantity,
      0
    );

    return calculatedTotal;
  }

  private async handleMercadoPagoPreference(
    productsList: OrderProduct[]
  ): Promise<PreferenceResponseData> {
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
        payment_methods: {
          excluded_payment_types: [{ id: "ticket" }],
        },
      },
    });

    return {
      paymentUrl: preferenceResponse.init_point,
      paymentId: preferenceResponse.id,
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

    const { paymentId, paymentUrl } = preferenceResponse;

    if (!paymentUrl || !paymentId) throw new Error(ERROR_ADDING_ORDER);

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

    console.log("payment id prop", paymentId);

    this.paymentId = paymentId;

    return paymentUrl;
  }

  private async handlePaymentStatus(): Promise<void> {
    console.log("payment id da request", this.paymentId);
    const paymentUrl = `${BASE_MERCADO_PAGO_API_URL}/payments/${this.paymentId}`;

    let paymentResponse;

    try {
      const request = await fetch(paymentUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      });

      paymentResponse = await request.json();

      console.log("payment response: ", paymentResponse);
    } catch (error) {
      throw error;
    }
  }

  async handleHmackVerification(req: Request): Promise<void> {
    const { headers } = req;

    const xSignature = headers["x-signature"] as string;
    const xRequestId = headers["x-request-id"] as string;

    const dataID = req.query["data.id"];

    const parts = xSignature.split(",");

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

    await this.handlePaymentStatus();
  }
}

const orderService = new OrderService();

export default orderService;
