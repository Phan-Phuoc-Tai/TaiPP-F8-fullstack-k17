import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import videoRoute from "./routes/video.route";
import { ZodError } from "zod";
import { errorResponse } from "./utils/response";
const app = express();
const PORT = +process.env.PORT!;

app.use(express.json());
app.use("/api", videoRoute);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    const status: number = 400;
    if (error instanceof ZodError) {
      const zodError = Object.fromEntries(
        error.issues.map(({ path, message }) => {
          return [path[0], message];
        }),
      );
      errorResponse(response, zodError, status);
    }
    errorResponse(response, error.message, status);
    next();
  },
);

app.listen(PORT, () => {
  console.log(`Server is running with port: ${PORT}`);
});
