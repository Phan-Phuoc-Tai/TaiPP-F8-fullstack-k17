import { JwtPayload } from "jsonwebtoken";
import { UserData } from "../types/user.type";
import { redisClient } from "../utils/redis";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";

export const authService = {
  async loginWithGoogle(userData: UserData) {
    //find Email
    const emailExist = await userService.findEmailExist(userData.email);

    //email is already exist -> create email in db
    if (!emailExist) {
      const newUser = await userService.create(userData);
      return newUser;
    }

    return emailExist;
  },
  createToken(userId: number) {
    const accessToken = jwtService.createAccessToken(userId);
    const refreshToken = jwtService.createRefreshToken(userId);
    this.saveTokenOnRedis("refresh", userId, accessToken, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  },
  saveTokenOnRedis(
    key: "refresh",
    userId: number,
    accessToken: string,
    refreshToken: string,
  ) {
    //key: refreshToken:{userId}:{refreshJti}
    //value: {"access":"accessJti","refresh":"refreshJti","userId":userIDvalue}
    const decodeAccess = jwtService.decodedToken(accessToken) as JwtPayload;
    const decodeRefresh = jwtService.decodedToken(refreshToken) as JwtPayload;
    //set thời gian sống cho token
    const ttlRefresh = Math.ceil(decodeRefresh.exp! - Date.now() / 1000);
    const keyRedis = `${key}:${userId}:${decodeRefresh.jti}`;
    return redisClient.setEx(
      keyRedis,
      ttlRefresh,
      JSON.stringify({
        access: decodeAccess.jti,
        refresh: decodeRefresh.jti,
        userId,
      }),
    );
  },
  deleteTokenOnRedis(refreshToken: string, key: "refresh") {
    const decodeRefresh = jwtService.decodedToken(refreshToken) as JwtPayload;
    const keyRedis = `${key}:${decodeRefresh.userId}:${decodeRefresh.jti}`;
    return redisClient.del(keyRedis);
  },
};
