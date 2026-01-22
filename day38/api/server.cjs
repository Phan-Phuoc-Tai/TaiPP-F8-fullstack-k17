const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const dbPath = path.join(__dirname, "db.json");
const router = jsonServer.router(dbPath);

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  }),
);

server.use(router);

module.exports = server;
