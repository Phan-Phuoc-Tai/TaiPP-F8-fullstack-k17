import express, { NextFunction, Request, Response } from "express";
import indexRouter from "./routes/index.route";
import { errorResponse } from "./utils/response";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(indexRouter);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      const errorMessage = error.message || `Server error`;
      if (error.message.includes(`not found`)) {
        return errorResponse(response, errorMessage, 404);
      }
      errorResponse(response, errorMessage, 400);
      next();
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server running with Port: ${PORT}`);
});
