const Author = require("../Model/Schemas/Author");

const AuthorController = [
  { method: "post", function: CreateAuthor },
  { method: "get", function: GetAuthor },
  { method: "delete", function: DeleteAuthor },
  { method: "put", function: UpdateAuthor },
];

async function CreateAuthor(req, res) {
  try {
    const response = await Author.create(req.body);
    res.send(response);
  } catch (err) {
    res.send("Could Not Create Author");
  }
}

async function GetAuthor(req, res) {
  try {
    const response = await Author.findAll();
    res.send(response);
  } catch (err) {
    res.send("Could Not Get Authors");
  }
}

async function UpdateAuthor(req, res) {
  try {
    const response = await Author.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    if (response[0] === 1) {
      res.send(
        await Author.findAll({
          where: {
            id: req.body.id,
          },
        })
      );
      return;
    }
    if (response[0] === 0) {
      res.send("Author By Id Doesn't exist");
    }
  } catch (err) {
    res.send(err);
  }
}

async function DeleteAuthor(req, res) {
  try {
    const response = await Author.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (response === 1) {
      res.send("Succesfully Deleted Author");
      return;
    }
    if (response === 0) {
      res.send("Author Does Not Exists");
      return;
    }
  } catch (err) {
    res.send("Could Not Delete Author");
  }
}

module.exports = AuthorController;
