import { Request, Response } from "express";
import { OAuth } from "../constants/OAuth.constant";
import { authService } from "../services/auth.service";
import { UserData } from "../types/user.type";
// import { successResponse } from "../utils/response";

export const authController = {
  index(request: Request, response: Response) {
    if (request.session.user) {
      return response.redirect("/");
    }
    return response.render("login");
  },
  googleRedirect(request: Request, response: Response) {
    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      response_type: "code",
      scope: "email profile",
      access_type: "offline",
    } as unknown as Record<string, string>;
    const urlRedirect = `${OAuth.GOOGLE.URL_AUTHENTICATION_CODE}?${new URLSearchParams(params).toString()}`;
    response.redirect(urlRedirect);
  },
  async googleCallback(request: Request, response: Response) {
    const { code } = request.query;
    const ggResponse = await fetch(OAuth.GOOGLE.URL_ACCESS_TOKEN, {
      method: "POST",
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      }),
    });
    const { access_token } = await ggResponse.json();
    const responseUser = await fetch(OAuth.GOOGLE.URL_USER_FROM_ACCESS_TOKEN, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const { id, name, email, verified_email } = await responseUser.json();
    const userInfo: UserData = {
      googleId: id,
      name,
      email,
      verified_email,
    };
    const user = await authService.loginWithGoogle(userInfo);
    if (!user) {
      throw new Error("Login failed");
    }
    request.session.user = user;
    const token = authService.createToken(user.id);
    if (!token) {
      throw new Error("Login failed");
    }
    request.session.token = token.refreshToken;
    return response.redirect("/");
    //  successResponse(
    //   response,
    //   {
    //     ...user,
    //     ...token,
    //   },
    //   "Login success",
    //   200,
    // );
  },
  async logout(request: Request, response: Response) {
    await authService.deleteTokenOnRedis(request.session.token!, "refresh");
    delete request.session.user;
    delete request.session.token;
    return response.redirect("/login");
  },
};
