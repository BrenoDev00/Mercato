/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";
import productService from "../services/product-service.js";
import { IProductController } from "../types/controllers/product-controller.type.js";
import { StatusCode } from "../types/status-code.type.js";
import InternalError from "../utils/errors/internal-error.js";
import {
  PRODUCT_CATEGORY_NOT_FOUND,
  PRODUCT_NOT_FOUND,
} from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";

class ProductController implements IProductController {
  async getProducts(_: Request, res: Response): Promise<Response> {
    try {
      const products = await productService.getProducts();

      return res.status(StatusCode.OK).send(products);
    } catch {
      throw new InternalError();
    }
  }

  async addProduct(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
      const addedProduct = await productService.addProduct(body);

      return res.status(StatusCode.CREATED).send(addedProduct);
    } catch (error: any) {
      if (error.message === PRODUCT_CATEGORY_NOT_FOUND)
        throw new NotFoundError(PRODUCT_CATEGORY_NOT_FOUND);

      throw new InternalError();
    }
  }

  async editProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { body } = req;

    try {
      const editedProduct = await productService.editProduct({
        ...body,
        id,
      });

      return res.status(StatusCode.OK).send(editedProduct);
    } catch (error: any) {
      if (error.message === PRODUCT_CATEGORY_NOT_FOUND)
        throw new NotFoundError(PRODUCT_CATEGORY_NOT_FOUND);

      if (error.message === PRODUCT_NOT_FOUND)
        throw new NotFoundError(PRODUCT_NOT_FOUND);

      throw new InternalError();
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await productService.deleteProduct(id!);

      return res.status(StatusCode.NO_CONTENT).send();
    } catch (error: any) {
      if (error.message === PRODUCT_NOT_FOUND)
        throw new NotFoundError(PRODUCT_NOT_FOUND);

      throw new InternalError();
    }
  }
}

const productController = new ProductController();

export default productController;
