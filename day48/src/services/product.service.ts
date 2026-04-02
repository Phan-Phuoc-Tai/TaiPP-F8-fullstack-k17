import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ProductWhereInput } from "../generated/prisma/models";
import { ProductData, ProductQuery } from "../types/product.type";
import { prisma } from "../utils/prisma";

export const productService = {
  create(productData: ProductData) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: productData.userId,
        },
      });
      if (!user) {
        throw new Error(`User not found`);
      }
      return await tx.product.create({
        data: {
          ...productData,
        },
      });
    });
  },
  findAll({ userId, q, page = 1, limit = 10 }: ProductQuery) {
    const filters = {} as ProductWhereInput;

    if (userId) {
      filters.userId = +userId;
    }

    if (q) {
      filters.name = {
        contains: q,
        mode: "insensitive",
      };
    }

    const offset = (page - 1) * limit;
    const options = {
      where: filters,
      skip: offset,
      take: limit < 51 ? limit : 50,
    };
    return Promise.all([
      prisma.product.findMany(options),
      prisma.product.count(),
    ]);
  },
  async find(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },
  async update(productId: number, productData: ProductData) {
    try {
      const product = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          ...productData,
        },
      });
      return product;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Product not found", { cause: error });
      }
    }
  },
  async delete(productId: number) {
    try {
      const product = await prisma.product.delete({
        where: {
          id: productId,
        },
      });
      return product;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Product not found", { cause: error });
      }
    }
  },
};
