import { NextFunction, Request, Response } from "express";
import { AUTH } from "../constants/auth.constant";
import { jwtService } from "../services/jwt.service";
import { JwtPayload } from "jsonwebtoken";
import { CACHE_KEY } from "../constants/redis.constant";
import { redisClient } from "../utils/redis";
import { UnauthorizedException } from "../exceptions/Unauthorized.exception";

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const accessToken = request.headers["authorization"]
    ?.split(" ")
    .slice(-1)
    .join();
  if (!accessToken) {
    throw new UnauthorizedException(AUTH.TOKEN.ERROR);
  }
  //Check black list
  //verify accessToken

  const decodedAccess = jwtService.verifyAccessToken(accessToken);
  if (!decodedAccess) {
    throw new UnauthorizedException(AUTH.TOKEN.ERROR);
  }

  //Check blacklist token
  const { jti: accessJti, userId } = jwtService.decodedToken(
    accessToken,
  ) as JwtPayload;
  const blacklistAccessKey = CACHE_KEY.AUTH.BLACKLIST_ACCESS_TOKEN(
    userId,
    accessJti!,
  );
  const blacklistAccess = await redisClient.get(`${blacklistAccessKey}`);

  if (blacklistAccess) {
    throw new UnauthorizedException(AUTH.TOKEN.ERROR);
  }
  request.accessToken = accessToken;
  next();
};
