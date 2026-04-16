import { Response } from "express";

const errorResponse = (
  response: Response,
  message: string | Record<string, string>,
  status: number,
) => {
  response.status(status || 500).json({
    success: false,
    message: message || "Server error",
    data: null,
  });
};

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

export { errorResponse, successResponse };
