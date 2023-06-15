const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  const date = new Date().toJSON()
  if (req.method === "PATCH") {
    req.body.updated_at = date
  }
  if (req.method === "POST") {
    req.body.created_at = date
    req.body.updated_at = date
  }

  next();
})



server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
