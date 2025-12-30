import { Router } from "express";
import authValidator from "../middlewares/auth-validator.js";
import roleValidator from "../middlewares/role-validator.js";
import { Role } from "../types/role.type.js";
import schemaValidator from "../middlewares/schema-validator.js";
import orderSchema from "../schemas/order-schema.js";
import OrderService from "../services/order-service.js";
import UserRepository from "../repositories/user-repository.js";
import ProductRepository from "../repositories/product-repository.js";
import OrderRepository from "../repositories/order-repository.js";
import OrdersOnProductsRepository from "../repositories/orders-on-products-respository.js";
import MercadoPagoPaymentService from "../services/mercado-pago-payment-service.js";
import OrderController from "../controllers/order-controller.js";

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();
const ordersOnProductsRepository = new OrdersOnProductsRepository();
const mercadoPagoPaymentService = new MercadoPagoPaymentService();

const orderService = new OrderService(
  userRepository,
  productRepository,
  orderRepository,
  ordersOnProductsRepository,
  mercadoPagoPaymentService
);

const orderController = new OrderController(orderService);

const orderRouter: Router = Router();

orderRouter.post(
  "/new",
  authValidator,
  roleValidator([Role.USER, Role.ADMIN]),
  schemaValidator(orderSchema),
  orderController.postOrder
);

orderRouter.post(
  "/payment-webhook",
  orderController.getMercadoPagoWebhookResponse
);

orderRouter.get(
  "/orders-info",
  authValidator,
  roleValidator([Role.ADMIN]),
  orderController.getOrdersInfo
);

export default orderRouter;
