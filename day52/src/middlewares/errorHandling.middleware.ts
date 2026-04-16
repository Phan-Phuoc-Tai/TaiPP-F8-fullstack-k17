import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { ErrorWithStatus } from "../types/error.type";

export const errorHandlingMiddleware = (
  error: ErrorWithStatus,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  errorResponse(response, error.message, error.status);
  next();
};
