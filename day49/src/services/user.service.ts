import { UserFindManyArgs, UserWhereInput } from "../generated/prisma/models";
import { UserQuery } from "../types/user.type";
import { prisma } from "../utils/prisma";

export const userService = {
  findAll({ status, s, page = 1, limit = 3, select = "" }: UserQuery) {
    const filters = {} as UserWhereInput;
    // const subFilters = [] as UserWhereInput[];
    if (["true", "false"].includes(status)) {
      filters.status = status === "true";
      // subFilters.push({
      //   status: status === "true",
      // });
    }

    // if (s) {
    //   subFilters.push({
    //     name: {
    //       contains: s,
    //       mode: "insensitive",
    //     },
    //   });
    // }
    // filters.OR = subFilters;

    // if (s) {
    //   filters.name = {
    //     contains: s,
    //     mode: "insensitive",
    //   };
    // }

    if (s) {
      filters.OR = [
        {
          name: {
            contains: s,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: s,
            mode: "insensitive",
          },
        },
      ];
    }

    const offset = (page - 1) * limit;
    type SelectType = {
      [key: string]: boolean;
    };
    const fields = select
      .trim()
      .split(",")
      .filter((item) => item)
      .reduce((acc, cur) => {
        acc[cur.trim()] = true;
        return acc;
      }, {} as SelectType);

    const options = {
      where: {
        ...filters,
        // posts: {
        //   // some: {}, // có ít nhất 1 post
        //   // none: {}, // có ít nhất 1 post
        //   // some: {
        //   //   title: {
        //   //     contains: "t 1",
        //   //   },
        //   // },
        // },
      },
      take: limit,
      skip: offset,
      orderBy: {
        id: "desc",
      },
      // include: {
      //   phone: true,
      //   posts: true,
      // },
    } as UserFindManyArgs;
    if (Object.keys(fields).length) {
      options.select = fields;
    }
    options.select = {
      id: true,
      email: true,
      name: true,
      _count: {
        select: {
          posts: true,
        },
      },
      phone: true,
      posts: true,
    };
    return Promise.all([
      prisma.user.findMany(options),
      prisma.user.count({
        where: filters,
      }),
    ]);
  },
  async find(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
  create({
    // phone,
    ...userData
  }: {
    name: string;
    email: string;
    status?: boolean;
    // phone?: string;
    password: string;
  }) {
    return prisma.user.create({
      data: {
        ...userData,
        created_at: new Date(),
        updated_at: new Date(),
        // phone: {
        //   create: {
        //     phone: phone!,
        //   },
        // },
      },
    });
  },
  update(
    id: number,
    {
      phone,
      ...userData
    }: { name: string; email: string; status: boolean; phone: string },
  ) {
    return prisma.user.update({
      where: { id },
      data: {
        ...userData,
        phone: {
          upsert: {
            where: {
              userId: id,
            },
            create: {
              phone,
            },
            update: {
              phone,
            },
          },
        },
      },
    }); // sử dụng với column unique
  },
  delete(id: number) {
    return prisma.$transaction([
      prisma.phone.delete({
        where: {
          userId: id,
        },
      }),
      prisma.user.delete({
        where: { id },
      }),
    ]);
  },
  existingEmail(email: string) {
    return prisma.user.count({
      where: { email },
    });
  },
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
