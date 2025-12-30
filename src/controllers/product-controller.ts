/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";
import { IProductController } from "../types/controllers/product-controller.type.js";
import { StatusCode } from "../types/status-code.type.js";
import InternalError from "../utils/errors/internal-error.js";
import {
  PRODUCT_CATEGORY_NOT_FOUND,
  PRODUCT_NOT_FOUND,
} from "../utils/constants.js";
import NotFoundError from "../utils/errors/not-found-error.js";
import ProductService from "../services/product-service.js";

class ProductController implements IProductController {
  constructor(private readonly productService: ProductService) {}

  async getProducts(_: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.listAll();

      return res.status(StatusCode.OK).send(products);
    } catch {
      throw new InternalError();
    }
  }

  async postProduct(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
      const addedProduct = await this.productService.create(body);

      return res.status(StatusCode.CREATED).send(addedProduct);
    } catch (error: any) {
      if (error.message === PRODUCT_CATEGORY_NOT_FOUND)
        throw new NotFoundError(PRODUCT_CATEGORY_NOT_FOUND);

      throw new InternalError();
    }
  }

  async putProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { body } = req;

    try {
      const editedProduct = await this.productService.editById({
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
      await this.productService.deleteById(id!);

      return res.status(StatusCode.NO_CONTENT).send();
    } catch (error: any) {
      if (error.message === PRODUCT_NOT_FOUND)
        throw new NotFoundError(PRODUCT_NOT_FOUND);

      throw new InternalError();
    }
  }
}

export default ProductController;
