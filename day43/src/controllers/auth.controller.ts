import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/response";

export const authController = {
  register: (request: Request, response: Response): void => {
    try {
      const user = authService.register(request.body);
      successResponse(response, user, "Đăng ký thành công", true, 201);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(response, null, error.message, false, 409);
      } else {
        //fallback other error or error type unknown
        errorResponse(response, null, "Lỗi không xác định", false, 500);
      }
    }
  },
  login: (request: Request, response: Response): void => {
    try {
      const user = authService.login(request.body);
      successResponse(response, user, "Đăng nhập thành công", true, 200);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(response, null, error.message, false, 400);
      } else {
        //fallback other error or error type unknown
        errorResponse(response, null, "Lỗi không xác định", false, 500);
      }
    }
  },
};
