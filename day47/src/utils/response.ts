import { Response } from "express";
import { Product } from "../types/product.type";

const successResponse = (
  response: Response,
  message: string,
  data: Product | Product[] | null,
  status: number,
) => {
  response.status(status).json({
    success: true,
    message: message,
    data: data,
  });
};

const errorResponse = (
  response: Response,
  message: string | Record<string, string>,
  status: number,
) => {
  response.status(status).json({
    success: false,
    message: message,
    data: null,
  });
};

export { errorResponse, successResponse };
