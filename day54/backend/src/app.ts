import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import postRouter from "./routes/post.route";
import authRouter from "./routes/auth.route";
import { errorHandlerMiddleware } from "./middlewares/errorhandler.middleware";

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use(postRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running with port: ${PORT}`);
});
