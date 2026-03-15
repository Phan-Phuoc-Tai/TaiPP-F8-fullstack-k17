import { Response } from "express";
import { User } from "../types/user.type";

export const successResponse = (
  response: Response,
  data: User,
  message: string,
  status: boolean,
  statusCode: number = 200,
) => {
  return response.status(statusCode).json({
    success: status,
    message: message,
    data: data,
  });
};

export const errorResponse = (
  response: Response,
  data: null,
  message: string,
  status: boolean,
  statusCode: number = 500,
) => {
  return response.status(statusCode).json({
    success: status,
    message: message,
    data: data,
  });
};
