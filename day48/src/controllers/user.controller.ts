import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { UserQuery } from "../types/user.type";
import { postService } from "../services/post.service";
import { successResponse } from "../utils/response";

export const userController = {
  findAll: async (request: Request, response: Response) => {
    const [users, count] = await userService.findAll(
      request.query as unknown as UserQuery,
    );
    response.json({
      success: true,
      message: "Get users success",
      data: users,
      meta: {
        total: count,
        currentPage: request.query.page ? +request.query.page : 1,
      },
    });
  },
  find: async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await userService.find(+id!);
    response.json({
      success: true,
      message: `Get user ${id} success`,
      data: user,
    });
  },
  create: async (request: Request, response: Response) => {
    const user = await userService.create(request.body);
    successResponse(response, `Create user success`, user, 201);
  },
  update: async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await userService.update(request.body, +id!);
    response.status(200).json({
      success: true,
      message: "Update user success",
      data: user,
    });
  },
  delete: async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await userService.delete(+id!);
    response.status(200).json({
      success: true,
      message: "Delete user success",
      data: user,
    });
  },
  createPost: async (request: Request, response: Response) => {
    const userId = request.params.id;
    const body = request.body;
    const post = await postService.create(+userId!, body);
    response.status(201).json({
      success: true,
      message: "Create post by user success",
      data: post,
    });
  },
};
