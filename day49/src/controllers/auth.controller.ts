import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async register(request: Request, response: Response) {
    const user = await authService.register(request.body);
    response.status(201).json({
      success: true,
      message: `Register success`,
      data: user,
    });
  },
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: `Email or password not correct`,
      });
    }
    const token = await authService.login(email, password);
    response.status(200).json({
      success: true,
      message: "Login success",
      data: token,
    });
  },
  async profile(request: Request, response: Response) {
    response.status(200).json({
      success: true,
      message: "Get user profile success",
      data: request.user,
    });
  },
  async logout(request: Request, response: Response) {
    const { refreshToken: token } = request.body;
    await authService.logout(token);
    response.json({
      success: true,
      message: "Logout success",
    });
  },
  async refreshToken(request: Request, response: Response) {
    const { refreshToken: token } = request.body;
    if (!token) {
      return response.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    try {
      const tokens = await authService.refreshToken(token);
      return response.status(200).json({
        success: true,
        message: "Refresh token success",
        data: tokens,
      });
    } catch {
      return response.status(400).json({
        success: false,
        message: "Refresh token invalid or expired",
      });
    }
  },
};
