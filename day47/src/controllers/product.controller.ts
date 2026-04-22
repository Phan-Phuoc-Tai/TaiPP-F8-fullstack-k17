import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { successResponse } from "../utils/response";

const productController = {
  create: async (request: Request, response: Response) => {
    const product = await productService.create(request.body);
    successResponse(response, `Create user success`, product, 201);
  },
  findAll: async (request: Request, response: Response) => {
    const products = await productService.findAll();
    successResponse(response, `Get products success`, products, 200);
  },
  find: async (request: Request, response: Response) => {
    const { id } = request.params;
    const product = await productService.find(+id!);
    successResponse(response, `Get product success`, product, 200);
  },
  update: async (request: Request, response: Response) => {
    const { id } = request.params;
    const product = await productService.update(+id!, request.body);
    successResponse(response, `Update product success`, product, 200);
  },
  delete: async (request: Request, response: Response) => {
    const { id } = request.params;
    const productDelete = await productService.delete(+id!);
    successResponse(response, `Delete product success`, productDelete, 204);
  },
};

export { productController };
