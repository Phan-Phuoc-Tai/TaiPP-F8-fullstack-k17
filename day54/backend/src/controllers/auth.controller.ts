import { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { authService } from "../services/auth.service";
import { AUTH } from "../constants/auth.constant";

export const authController = {
  async register(request: Request, response: Response) {
    const user = await authService.register(request.body);
    successResponse(response, user, AUTH.REGISTER.SUCCESS, 201);
  },
  async login(request: Request, response: Response) {
    const user = await authService.login(request.body);
    const { refreshToken, ...rest } = user;
    const ttl = 7 * 24 * 60 * 60 * 1000;
    authService.saveRefreshTokenOnCookie(
      response,
      "refreshToken",
      refreshToken,
      ttl,
    );
    successResponse(response, rest, AUTH.LOGIN.SUCCESS, 200);
  },
  // async refreshToken(request: Request, response: Response) {
  //   const { refreshToken } = request.cookies;
  // },
  async logout(request: Request, response: Response) {
    const { refreshToken } = request.cookies;
    const accessToken = request.accessToken as string;
    await authService.logout(accessToken, refreshToken);
    successResponse(response, null, AUTH.LOGOUT.SUCCESS, 200);
  },
};
