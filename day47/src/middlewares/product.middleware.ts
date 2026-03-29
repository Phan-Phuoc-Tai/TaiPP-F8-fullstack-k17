import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { errorResponse } from "../utils/response";

const productMiddleware =
  (schema: ZodType) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body = await schema.parseAsync(request.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = Object.fromEntries(
          error.issues.map(({ path, message }) => {
            return [path[0], message];
          }),
        );
        errorResponse(response, zodError, 400);
      }
    }
  };

export { productMiddleware };
