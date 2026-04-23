import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";

import { ErrorWithStatus } from "../types/error.type";

export const errorHandlerMiddleware = (
  error: ErrorWithStatus,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  errorResponse(response, error.message || "Server error", error.status || 500);
  next();
};
