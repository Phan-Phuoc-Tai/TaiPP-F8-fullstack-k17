import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  request.user = {
    name: "PT",
  };
  next();
};
