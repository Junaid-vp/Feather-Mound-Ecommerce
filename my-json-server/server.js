const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
const port = process.env.PORT || 3000; // Render sets PORT automatically
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
