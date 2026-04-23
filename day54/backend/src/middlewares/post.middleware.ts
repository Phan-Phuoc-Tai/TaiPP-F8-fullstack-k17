import { NextFunction, Request, Response } from "express";

export const postMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  next();
};
