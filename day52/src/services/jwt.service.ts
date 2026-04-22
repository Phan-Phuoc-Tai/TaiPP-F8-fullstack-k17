import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as unknown as string;
const JWT_EXPIRED = process.env.JWT_EXPIRED as unknown as number;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as unknown as string;
const JWT_REFRESH_EXPIRED = process.env
  .JWT_REFRESH_EXPIRED as unknown as number;
export const jwtService = {
  createAccessToken(userId: number) {
    const payload = {
      userId,
      jti: crypto.randomUUID(),
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRED,
    });
  },
  createRefreshToken(userId: number) {
    const payload = {
      userId,
      jti: crypto.randomUUID(),
    };
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRED,
    });
  },
  decodedToken(token: string) {
    return jwt.decode(token);
  },
};
