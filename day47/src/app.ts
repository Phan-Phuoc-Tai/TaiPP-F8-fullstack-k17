import express, { NextFunction, Request, Response } from "express";
import productRouter from "./routers/product.router";
import { errorResponse } from "./utils/response";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(productRouter);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      const errorMessage = error.message || `Server error`;
      if (errorMessage.includes(`Product is not found with id:`)) {
        errorResponse(response, errorMessage, 404);
      }
      errorResponse(response, errorMessage, 500);
    }
    next();
  },
);

app.listen(3000, () => {
  console.log(`Server is running with port: ${PORT}`);
});
