import { OrderProduct } from "../types/order-product.type.js";
import { IMercadoPagoPaymentService } from "../types/services/mercado-pago-payment-service.type.js";
import { Preference } from "mercadopago";
import { Request } from "express";
import crypto from "node:crypto";
import { client } from "../config/mercado-pago-client.js";

class MercadoPagoPaymentService implements IMercadoPagoPaymentService {
  async setMercadoPagoPreference(
    productsList: OrderProduct[]
  ): Promise<string | undefined> {
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

    const paymentUrl = preferenceResponse.init_point;

    return paymentUrl;
  }

  async handleHmackVerification(req: Request): Promise<string | undefined> {
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

    const hmacVerificationFailed = sha != hash;

    if (hmacVerificationFailed) {
      throw new Error();
    }

    return dataID as string;
  }
}

const mercadoPagoPaymentService = new MercadoPagoPaymentService();

export default mercadoPagoPaymentService;
