import { prisma } from "../lib/prisma";
import { UserData } from "../types/user.type";

export const userService = {
  findEmailExist(email: string) {
    return prisma.user.count({
      where: { email },
    });
  },
  create(userData: UserData) {
    return prisma.user.create({
      data: userData,
    });
  },
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
