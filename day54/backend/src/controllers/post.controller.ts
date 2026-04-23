import { Request, Response } from "express";
import { postService } from "../services/post.service";
import { successResponse } from "../utils/response";

export const postController = {
  async create(request: Request, response: Response) {
    const post = await postService.create(request.body);
    successResponse(response, post, `Create post success`, 201);
  },
  async findAll(request: Request, response: Response) {
    const posts = await postService.findAll();
    successResponse(response, posts, `Get posts success`, 200);
  },
  async find(request: Request, response: Response) {
    const { id } = request.params;
    const post = await postService.find(+id!);
    successResponse(response, post, `Get post success`, 200);
  },
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const post = await postService.update(request.body, +id!);
    successResponse(response, post, `Update post success`, 200);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const post = await postService.delete(+id!);
    successResponse(response, post, `Delete post success`, 200);
  },
};
