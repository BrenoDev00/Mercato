import { NewOrder } from "../types/new-order.type.js";
import { IOrderService } from "../types/services/order-service.type.js";
import orderRepository from "../repositories/order-repository.js";
import userRepository from "../repositories/user-repository.js";
import { PRODUCT_NOT_FOUND, USER_NOT_FOUND } from "../utils/constants.js";
import ordersOnProductsRepository from "../repositories/orders-on-products-respository.js";
import productRepository from "../repositories/product-repository.js";

class OrderService implements IOrderService {
  async addOrder(orderData: NewOrder): Promise<void> {
    const { userId, paymentMethod, totalInCents, products } = orderData;

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

    const orderId = await orderRepository.addOrder({
      userId,
      paymentMethod,
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
  }

  // aqui ficaria a lógica para integrar com algum método de pagamento e
  // posteriormente atualizar as colunas status e updated_at da tabela order.
}

const orderService = new OrderService();

export default orderService;
