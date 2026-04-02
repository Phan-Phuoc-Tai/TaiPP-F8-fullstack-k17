import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { successResponse } from "../utils/response";
import { ProductQuery } from "../types/product.type";

export const productController = {
  create: async (request: Request, response: Response) => {
    const product = await productService.create(request.body);
    successResponse(response, `Create product by user success`, product, 201);
  },
  findAll: async (request: Request, response: Response) => {
    const [products, count] = await productService.findAll(
      request.query as unknown as ProductQuery,
    );
    const page = request.query.page ? +request.query.page : 1;
    const limit = request.query.limit ? +request.query.limit : 10;
    const pagination = {
      total: count,
      page: page,
      limit: limit,
      totalPages: Math.ceil(count / limit),
    };
    successResponse(
      response,
      `Get products success`,
      products,
      200,
      pagination,
    );
  },
  find: async (request: Request, response: Response) => {
    const { id } = request.params;
    const product = await productService.find(+id!);
    successResponse(response, `Get product success`, product);
  },
  update: async (request: Request, response: Response) => {
    const productId = request.params.id;
    const product = await productService.update(+productId!, request.body);
    successResponse(response, `Update product success`, product!);
  },
  delete: async (request: Request, response: Response) => {
    const productId = request.params.id;
    const product = await productService.delete(+productId!);
    successResponse(response, `Delete product success`, product!);
  },
};
