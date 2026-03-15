import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/response";

export const authController = {
  register: (request: Request, response: Response) => {
    try {
      const user = authService.register(request.body);
      successResponse(response, user, "Đăng ký thành công", true, 201);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(response, null, error.message, false, 409);
      }
    }
  },
  login: (request: Request, response: Response) => {
    try {
      const user = authService.login(request.body);
      successResponse(response, user, "Đăng nhập thành công", true, 200);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(response, null, error.message, false, 400);
      }
    }
  },
};
