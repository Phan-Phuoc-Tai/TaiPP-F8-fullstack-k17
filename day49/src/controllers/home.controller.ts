import { Request, Response } from "express";

export const homeController = {
  index: (request: Request, response: Response) => {
    const user = request.user;
    response.json({ user });
  },
};
