import { NewOrder } from "../types/new-order.type.js";
import { IOrderService } from "../types/services/order-service.type.js";
import {
  BASE_MERCADO_PAGO_API_URL,
  ERROR_ADDING_ORDER,
  PRODUCT_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import { OrderProduct } from "../types/order-product.type.js";
import { Request } from "express";
import MercadoPagoPaymentService from "./mercado-pago-payment-service.js";
import { OrdersInfoResponse } from "../types/orders-info-response.type.js";
import { OrderStatus } from "../types/order-status.type.js";
import UserRepository from "../repositories/user-repository.js";
import ProductRepository from "../repositories/product-repository.js";
import OrderRepository from "../repositories/order-repository.js";
import OrdersOnProductsRepository from "../repositories/orders-on-products-respository.js";

class OrderService implements IOrderService {
  private orderId: string = "";

  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly ordersOnProductsRepository: OrdersOnProductsRepository,
    private readonly mercadoPagoPaymentService: MercadoPagoPaymentService
  ) {}

  private calculateTotalInCents(productsList: OrderProduct[]): number {
    const calculatedTotal = productsList.reduce(
      (sum, item) => sum + item.priceInCents * item.quantity,
      0
    );

    return calculatedTotal;
  }

  async create(orderData: NewOrder): Promise<string> {
    const { userId, products } = orderData;

    const searchedUser = await this.userRepository.findById(userId);

    if (!searchedUser) throw new Error(USER_NOT_FOUND);

    for (const product of products) {
      const searchedProductId = await this.productRepository.findProductId(
        product.id
      );

      if (!searchedProductId) {
        throw new Error(PRODUCT_NOT_FOUND);
      }
    }

    const paymentUrl = await this.mercadoPagoPaymentService.setPreference(
      products
    );

    if (!paymentUrl) throw new Error(ERROR_ADDING_ORDER);

    const totalInCents = this.calculateTotalInCents(products);

    const orderId = await this.orderRepository.create({
      userId,
      totalInCents,
    });

    for (const product of products) {
      const { id, quantity } = product;

      await this.ordersOnProductsRepository.create({
        productId: id,
        orderId,
        quantity,
      });
    }

    this.orderId = orderId;

    return paymentUrl;
  }

  async update(req: Request): Promise<void> {
    const dataID = await this.mercadoPagoPaymentService.handleHmackVerification(
      req
    );

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

      await this.orderRepository.update(this.orderId, {
        status,
        updatedAt: date_last_updated,
      });
    }
  }

  async listOrdersInfo(): Promise<OrdersInfoResponse> {
    const ordersData = await this.orderRepository.findOrdersInfo();

    const formattedOrdersInfo: OrdersInfoResponse = {
      total: ordersData.length,
      ordersInfo: ordersData.map((orderInfo) => {
        const {
          id,
          status,
          totalInCents,
          createdAt,
          updatedAt,
          user,
          ordersOnProducts,
        } = orderInfo;

        return {
          id,
          status: status as OrderStatus,
          totalInCents,
          createdAt,
          updatedAt,
          buyer: user,
          products: ordersOnProducts.map((orderOnProduct) => {
            const { id, name, priceInCents, categoriesOnProducts } =
              orderOnProduct.product;

            return {
              id,
              name,
              quantity: orderOnProduct.quantity,
              priceInCents,
              categories: categoriesOnProducts.map((categoryOnProduct) => {
                const { category } = categoryOnProduct;

                return {
                  id: category.id,
                  name: category.name,
                };
              }),
            };
          }),
        };
      }),
    };

    return formattedOrdersInfo;
  }
}

export default OrderService;
