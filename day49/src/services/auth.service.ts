import { JwtPayload } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/hashing";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";
import { redisClient } from "../utils/redis";
import { prisma } from "../utils/prisma";

export const authService = {
  async register(userData: { name: string; email: string; password: string }) {
    //Hashing password
    const passwordHash = hashPassword(userData.password);
    //Gọi userService để thêm vào database
    const user = await userService.create({
      ...userData,
      password: passwordHash,
    });
    //Gửi email xác thực, chào mừng(pending: phải học queue)
    //Tạo token (Gọi jwtService)
    const accessToken = jwtService.createAccessToken(user.id);
    return {
      token: {
        accessToken,
      },
    };
  },
  async login(email: string, password: string) {
    //Find email
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error("Email or password not correct");
    }

    //Lấy password hash
    const passwordHash = user.password;

    //Verify password
    if (!verifyPassword(password, passwordHash)) {
      throw new Error("Email or password not correct");
    }

    //Tạo token
    const accessToken = jwtService.createAccessToken(user.id);
    const refreshToken = jwtService.createRefreshToken(user.id);

    // Tính thời điểm hết hạn của refresh token (7 ngày)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    //Thêm refreshToken vừa tạo vào database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: expiresAt,
      },
    });
    return {
      accessToken,
      refreshToken,
    };
  },
  async profile(token: string) {
    //verify token
    const decoded = jwtService.verifyAccessToken(token);
    if (!decoded) {
      return false;
    }
    //check blacklist
    const blacklist = await redisClient.get(`blacklist:${token}`);
    if (blacklist) {
      return false;
    }
    const { userId } = decoded as JwtPayload;

    //Query database
    const user = await userService.find(userId);
    //Check user block không? verify chưa?

    return user;
  },
  async logout(token: string) {
    const { exp, userId } = jwtService.decodedToken(token) as JwtPayload;
    const seconds = Math.ceil(exp! - Date.now() / 1000);
    // await redisClient.set(`blacklist:${token}`, 1);
    await redisClient.setEx(`blacklist:${token}`, seconds, "1");
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });
    return true;
  },
  async refreshToken(token: string) {
    //verify token
    console.log(token);

    const decoded = jwtService.verifyRefreshToken(token);
    if (!decoded) {
      console.log("not decoded");

      return false;
    }
    //Check refreshToken có tồn tại trong database
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
    });
    if (!refreshToken) {
      console.log("not found token");

      return false;
    }
    //Check expiresAt đã hết hạn chưa
    if (refreshToken.expiresAt < new Date()) {
      return false;
    }

    const { userId } = decoded as JwtPayload;
    //Xoá refreshToken trong database
    await prisma.refreshToken.delete({
      where: { token },
    });

    // cấp lại accessToken mới
    const newAccessToken = jwtService.createAccessToken(userId);
    // cấp lại refreshToken mới
    const newRefreshToken = jwtService.createRefreshToken(userId);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId,
        expiresAt,
      },
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },
};
