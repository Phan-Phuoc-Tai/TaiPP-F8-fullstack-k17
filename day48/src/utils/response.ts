import { Response } from "express";
import { ProductPagination, ProductResponse } from "../types/product.type";
import { UserResponse } from "../types/user.type";

const successResponse = (
  response: Response,
  message: string,
  data: ProductResponse | ProductResponse[] | UserResponse | UserResponse[],
  status = 200,
  pagination?: ProductPagination,
) => {
  response.status(status).json({
    success: true,
    message: message,
    data: data,
    pagination: pagination,
  });
};

const errorResponse = (response: Response, message: string, status = 500) => {
  response.status(status).json({
    success: false,
    error: message,
    data: null,
  });
};

const zodErrorResponse = (
  response: Response,
  message: string,
  details: Record<string, string>,
  status = 400,
) => {
  response.status(status).json({
    success: false,
    error: message,
    details: details,
  });
};

export { successResponse, errorResponse, zodErrorResponse };
