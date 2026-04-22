const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const indexRoute = require("./src/routes");
const flashMiddleware = require("./src/middlewares/flash.middleware");
const app = express();
app.use(express.urlencoded());
app.set("views", `${path.join(__dirname, "src", "views")}`);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
app.use(flashMiddleware);
app.use(indexRoute);

app.listen(3000, () => {
  console.log("Đang chạy với port 3000");
});
