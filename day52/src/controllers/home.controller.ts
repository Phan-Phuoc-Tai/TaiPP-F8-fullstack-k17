import { Request, Response } from "express";

export const homeController = {
  async index(request: Request, response: Response) {
    if (!request.session.user) {
      return response.redirect("/login");
    }
    return response.render("home", {
      name: request.session.user!.name,
    });
  },
};
