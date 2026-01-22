const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const router = jsonServer.router("./api/db.json");

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  }),
);

server.use(router);

module.exports = server;
