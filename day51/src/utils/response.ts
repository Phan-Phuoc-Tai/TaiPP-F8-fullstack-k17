import { Response } from "express";

const successResponse = (
  response: Response,
  message: string,
  data: unknown,
  status: number,
) => {
  response.status(status).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (
  response: Response,
  message: string | Record<string, string>,
  status: number,
) => {
  response.status(status).json({
    success: true,
    message,
    data: null,
  });
};

export { successResponse, errorResponse };
