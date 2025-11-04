import { NewOrder } from "../types/new-order.type.js";
import { IOrderService } from "../types/services/order-service.type.js";
import orderRepository from "../repositories/order-repository.js";
import userRepository from "../repositories/user-repository.js";
import {
  BASE_MERCADO_PAGO_API_URL,
  ERROR_ADDING_ORDER,
  PRODUCT_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import ordersOnProductsRepository from "../repositories/orders-on-products-respository.js";
import productRepository from "../repositories/product-repository.js";
import { OrderProduct } from "../types/order-product.type.js";
import { Request } from "express";
import mercadoPagoPaymentService from "./mercado-pago-payment-service.js";

class OrderService implements IOrderService {
  private orderId: string = "";

  private calculateTotalInCents(productsList: OrderProduct[]): number {
    const calculatedTotal = productsList.reduce(
      (sum, item) => sum + item.priceInCents * item.quantity,
      0
    );

    return calculatedTotal;
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

    const preferenceResponse =
      await mercadoPagoPaymentService.setMercadoPagoPreference(products);

    const paymentUrl = preferenceResponse;

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

  async updateOrder(req: Request): Promise<void> {
    const dataID = await mercadoPagoPaymentService.handleHmackVerification(req);

    const paymentUrl = `${BASE_MERCADO_PAGO_API_URL}/payments/${dataID}`;

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
}

const orderService = new OrderService();

export default orderService;
