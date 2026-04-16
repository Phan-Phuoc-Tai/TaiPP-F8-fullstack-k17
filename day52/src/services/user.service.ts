import { UserCreateInput } from "../generated/prisma/models";
import { prisma } from "../libs/prisma";

export const userService = {
  findEmailExist(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
  create(userData: UserCreateInput) {
    return prisma.user.create({
      data: userData,
    });
  },
};
