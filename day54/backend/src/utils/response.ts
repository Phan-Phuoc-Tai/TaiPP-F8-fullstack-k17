import { Response } from "express";

const successResponse = (
  response: Response,
  data: unknown,
  message: string,
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
    success: false,
    message,
    data: null,
  });
};
export { successResponse, errorResponse };
