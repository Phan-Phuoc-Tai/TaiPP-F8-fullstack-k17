import { prisma } from "../utils/prisma";

export const postService = {
  async create(
    userId: number,
    postData: {
      title: string;
      content: string;
    },
  ) {
    //user này có tồn tại hay không
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new Error(`User not found`);
      }

      await tx.post.create({
        data: {
          ...postData,
          userId,
        },
      });
    });
  },
};
