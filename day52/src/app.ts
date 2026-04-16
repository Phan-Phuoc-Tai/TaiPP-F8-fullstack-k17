import express from "express";
import session from "express-session";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import authRoute from "./routes/auth.route";
import homeRoute from "./routes/home.route";
import { errorHandlingMiddleware } from "./middlewares/errorHandling.middleware";
import { redisSub } from "./utils/redis";
import { COINJOB } from "./constants/coin.constant";

const app = express();
const PORT = 3000;
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.use(
  session({
    secret: "ydfC7Vd3edtnBOUu8JrmsHAwB+xs4iXaTv0U/VQ5o+w=",
    resave: false,
    saveUninitialized: false,
  }),
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

io.on("connection", () => {
  redisSub.subscribe(COINJOB.CHANNEL, (message) => {
    try {
      const data = JSON.parse(message);
      io.emit("coin-prices", data);
    } catch (err) {
      console.error("Lỗi parse:", err);
    }
  });
});

app.use(homeRoute);
app.use(authRoute);

app.use(errorHandlingMiddleware);

httpServer.listen(PORT, () => {
  console.log(`Server is running with port: ${PORT}`);
});
