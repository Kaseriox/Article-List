const Article = require("../Model/Schemas/Article");

const AuthorController = [
  { method: "post", function: CreateArticle },
  { method: "get", function: GetArticles },
  { method: "delete", function: DeleteArticle },
  { method: "put", function: UpdateArticle },
];

async function CreateArticle(req, res) {
  try {
    const response = await Article.create(req.body);
    res.send(response);
  } catch (err) {
    res.send("Could Not Create Article");
  }
}
async function UpdateArticle(req, res) {
  delete req.body.AuthorID;
  try {
    const response = await Article.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    if (response[0] === 1) {
      res.send(
        await Article.findAll({
          where: {
            id: req.body.id,
          },
        })
      );
      return;
    }
    if (response[0] === 0) {
      res.send("Article By Id Doesn't exist");
    }
  } catch (err) {
    res.send(err);
  }
}

async function GetArticles(req, res) {
  try {
    const response = await Article.findAll();
    res.send(response);
  } catch (err) {
    res.send("Could Not Get Articles");
  }
}

async function DeleteArticle(req, res) {
  try {
    const response = await Article.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (response === 1) {
      res.send("Succesfully Deleted Article");
      return;
    }
    if (response === 0) {
      res.send("Article Does Not Exists");
      return;
    }
  } catch (err) {
    res.send("Could Not Delete Article");
  }
}

module.exports = AuthorController;
