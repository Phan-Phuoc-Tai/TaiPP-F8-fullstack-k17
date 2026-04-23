import { JwtPayload } from "jsonwebtoken";
import { AUTH } from "../constants/auth.constant";
import { UserData } from "../types/user.type";
import { hashPassword, verifyPassword } from "../utils/hashing";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";
import { redisClient } from "../utils/redis";
import { Response } from "express";
import { CACHE_KEY } from "../constants/redis.constant";
import { UnauthorizedException } from "../exceptions/Unauthorized.exception";
import { BadRequestException } from "../exceptions/BadRequest.exception";

export const authService = {
  async register(userData: UserData) {
    const { password } = userData;
    //hash password
    const passwordHash = await hashPassword(password);
    //create user in database
    const user = await userService.create({
      ...userData,
      password: passwordHash,
    });
    const { password: _, ...newUser } = user;
    //send mail (bổ sung sau)
    //return
    return newUser;
  },
  async login({ email, password }: Omit<UserData, "name">) {
    //Check user correct
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(AUTH.LOGIN.ERRORS.LOGIN_FAILED);
    }
    //Verify password with passwordHash of user
    const passwordHash = await verifyPassword(password, user.password);
    if (!passwordHash) {
      throw new BadRequestException(AUTH.LOGIN.ERRORS.LOGIN_FAILED);
    }
    //Check verified
    //send mail
    //Create token {access, refresh}
    const accessToken = jwtService.createAccessToken(user.id);
    const refreshToken = jwtService.createRefreshToken(user.id);

    //Lưu redis
    await this.saveTokenOnRedis(
      "refreshToken",
      user.id,
      accessToken,
      refreshToken,
    );
    const { password: _, ...safeUser } = user;
    //return
    return {
      ...safeUser,
      accessToken,
      refreshToken,
    };
  },
  saveTokenOnRedis(
    key: "refreshToken",
    userId: number,
    accessToken: string,
    refreshToken: string,
  ) {
    //key: refreshToken:{userID}:{refreshJti}
    //value: {"access":"accessJti"; "refresh":"refreshJti"}
    const decodeAccess = jwtService.decodedToken(accessToken) as JwtPayload;
    const decodeRefresh = jwtService.decodedToken(refreshToken) as JwtPayload;
    const ttlRefresh = Math.ceil(decodeRefresh.exp! - Date.now() / 1000);

    return redisClient.setEx(
      `${key}:${userId}:${decodeRefresh.jti}`,
      ttlRefresh,
      JSON.stringify({
        access: decodeAccess.jti,
        refresh: decodeRefresh.jti,
        userId,
      }),
    );
  },
  saveRefreshTokenOnCookie(
    response: Response,
    key: "refreshToken",
    refreshToken: string,
    ttl: number,
  ) {
    response.cookie(key, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ttl,
    });
  },
  async logout(accessToken: string, refreshToken: string) {
    //accessToken đã verify  và check blacklist ở authMiddleware nên bây giờ chỉ cần thông tin userId và blacklistAccessKey từ accessToken
    const {
      exp: accessExp,
      jti: accessJti,
      userId,
    } = jwtService.decodedToken(accessToken) as JwtPayload;
    const blacklistAccessKey = CACHE_KEY.AUTH.BLACKLIST_ACCESS_TOKEN(
      userId,
      accessJti!,
    );

    //verify refreshToken
    const decodedRefresh = jwtService.verifyRefreshToken(refreshToken);
    if (!decodedRefresh) {
      throw new UnauthorizedException(AUTH.TOKEN.ERROR);
    }

    // check refresh exist on redis
    const { jti: refreshJti } = jwtService.decodedToken(
      refreshToken,
    ) as JwtPayload;
    //key: refreshToken:{userID}:{refreshJti}
    const key = CACHE_KEY.AUTH.REFRESH_TOKEN(userId, refreshJti!);
    const redisRefresh = await redisClient.get(key);
    if (!redisRefresh) {
      throw new UnauthorizedException(AUTH.TOKEN.ERROR);
    }

    const ttlAccess = Math.ceil(accessExp! - Date.now() / 1000);
    //blacklist accessToken
    await redisClient.setEx(`${blacklistAccessKey}`, ttlAccess, "1");
    //delete refreshToken on redis
    await redisClient.del(key);
    //return
    return true;
  },
};
