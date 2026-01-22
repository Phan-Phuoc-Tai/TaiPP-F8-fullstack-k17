const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const router = jsonServer.router(path.join(__dirname, "db.json"));

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  }),
);
server.use(router);

module.exports = server;
