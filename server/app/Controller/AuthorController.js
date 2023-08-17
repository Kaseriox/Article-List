const { Author } = require("../Model/Schemas/index");
const ParseQuery = require("../utils/QueryParser");
const AuthorController = [
  { method: "post", function: CreateAuthor },
  { method: "get", function: GetAuthors },
  { method: "get", function: GetAuthor, route: "/:id" },
  { method: "delete", function: DeleteAuthor, route: "/:id" },
  { method: "put", function: UpdateAuthor, route: "/:id" },
];

async function CreateAuthor(req, res) {
  try {
    const response = await Author.create(req.body);
    res.send(response);
  } catch (err) {
    res.send({ error: err.message });
  }
}

async function GetAuthors(req, res) {
  try {
    const params = ParseQuery(req.query);
    let response = await Author.findAndCountAll(params);
    res.send({
      page: req.query.page > 0 ? parseInt(req.query.page) : 1,
      TotalCount: response.count,
      CurrentCount: response.rows.length,
      rows: response.rows,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
}
async function GetAuthor(req, res) {
  try {
    const response = await Author.findByPk(req.params.id, {
      ...(req.query.expand && { include: req.query.expand }),
    });
    res.send(response ?? {"message":"Author Does Not Exists"})
  } catch (err) {
    res.send({ error: err.message });
  }
}
async function UpdateAuthor(req, res) {
  try {
    console.log(req.params.id);
    const response = await Author.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (response[0] === 1) {
      res.send(
        await Author.findAll({
          where: {
            id: req.params.id,
          },
        })
      );
      return;
    }
    if (response[0] === 0) {
      res.send({ message: "Author By Id Doesn't exist" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
}

async function DeleteAuthor(req, res) {
  try {
    const response = await Author.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (response === 1) {
      res.send({ message: "Succesfully Deleted Author" });
      return;
    }
    if (response === 0) {
      res.send({ message: "Author Does Not Exists" });
      return;
    }
  } catch (err) {
    res.send({ error: err.message });
  }
}

module.exports = AuthorController;
