import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers["authorization"]?.split(" ").slice(-1).join();
  if (!token) {
    return response.status(401).json({
      message: "Token invalid",
      success: false,
    });
  }
  const user = await authService.profile(token);
  if (!user) {
    return response.status(401).json({
      message: "Token invalid",
      success: false,
    });
  }
  request.user = user; //Cắm user{} vào tất cả request
  request.token = token; //Cắm token vào tất cả request
  next();
};
