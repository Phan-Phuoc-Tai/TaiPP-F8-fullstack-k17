import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (!request.session.user) {
    return response.redirect("/login");
  }
  next();
};
