import { BadRequestException } from "../exceptions/BadRequest.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";
import { prisma } from "../lib/prisma";
import { PostData } from "../types/post.type";

export const postService = {
  create(postData: PostData) {
    return prisma.post.create({
      data: postData,
    });
  },
  findAll() {
    return prisma.post.findMany();
  },
  async find(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException("Post is not found");
    }
    return post;
  },
  async update(postData: PostData, id: number) {
    const post = await prisma.post.update({
      where: { id },
      data: postData,
    });
    if (!post) {
      throw new BadRequestException("Update post failed");
    }
    return post;
  },
  async delete(id: number) {
    const post = await prisma.post.delete({
      where: { id },
    });
    if (!post) {
      throw new BadRequestException("Delete post failed");
    }
    return post;
  },
};
