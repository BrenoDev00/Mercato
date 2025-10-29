import { NewOrder } from "../types/new-order.type.js";
import { IOrderService } from "../types/services/order-service.type.js";
import orderRepository from "../repositories/order-repository.js";
import userRepository from "../repositories/user-repository.js";
import { PRODUCT_NOT_FOUND, USER_NOT_FOUND } from "../utils/constants.js";
import ordersOnProductsRepository from "../repositories/orders-on-products-respository.js";
import productRepository from "../repositories/product-repository.js";
import { OrderProduct } from "../types/order-product.type.js";
import { Preference } from "mercadopago";
import { client } from "../config/mercado-pago-client.js";

class OrderService implements IOrderService {
  private calculateTotalInCents(productsList: OrderProduct[]): number {
    const calculatedTotal = productsList.reduce(
      (sum, item) => sum + item.priceInCents * item.quantity,
      0
    );

    return calculatedTotal;
  }

  private async handleMercadoPagoPreference(
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
        payment_methods: {
          excluded_payment_types: [{ id: "ticket" }],
        },
      },
    });

    console.log(preferenceResponse);

    return preferenceResponse.init_point;
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

    const paymentUrl = await this.handleMercadoPagoPreference(products);

    if (paymentUrl) {
      return paymentUrl;
    } else {
      throw new Error();
    }
  }
}

const orderService = new OrderService();

export default orderService;
