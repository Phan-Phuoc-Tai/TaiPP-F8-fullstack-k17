import { Prisma } from "../generated/prisma/client";
import { Product, ProductUpdate } from "../types/product.type";
import { prisma } from "../utils/prisma";

const productService = {
  create(productData: Product) {
    return prisma.product.create({
      data: productData,
    });
  },
  async find(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new Error(`Product is not found with id: ${id}`);
    }
    return product;
  },
  findAll() {
    return prisma.product.findMany();
  },
  async update(id: number, updateProductData: ProductUpdate) {
    const updateProduct = await prisma.product
      .update({
        where: {
          id,
        },
        data: {
          ...updateProductData,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(`Product is not found with id: ${id}`);
        }
      });

    return updateProduct!;
  },
  async delete(id: number) {
    const deleteProduct = await prisma.product
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(`Product is not found with id: ${id}`);
        }
      });
    return deleteProduct!;
  },
};

export { productService };
