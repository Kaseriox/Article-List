const { Article } = require("../Model/Schemas/index");
const ParseQuery = require("../utils/QueryParser");

const ArticleController = [
  { method: "post", function: CreateArticle },
  { method: "get", function: GetArticles },
  { method: "get", function: GetArticle, route: "/:id" },
  { method: "delete", function: DeleteArticle, route: "/:id" },
  { method: "put", function: UpdateArticle, route: "/:id" },
];

async function CreateArticle(req, res) {
  try {
    const response = await Article.create(req.body);
    res.send(response);
  } catch (err) {
    res.send({ "error": err.message });
  }
}
async function UpdateArticle(req, res) {
  //delete req.body.AuthorID;
  try {
    const response = await Article.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (response[0] === 1) {
      res.send(await Article.findByPk(req.params.id));
      return;
    }
    if (response[0] === 0) {
      res.send({ "message": "Article By Id Doesn't exist" });
    }
  } catch (err) {
    res.send({ "error": err.message });
  }
}

async function GetArticles(req, res) {
  try {
    const params = ParseQuery(req.query);
    let response = await Article.findAndCountAll(params);
    res.send({
      page: req.query.page > 0 ? parseInt(req.query.page) : 1  ,
      TotalCount: response.count,
      CurrentCount: response.rows.length,
      rows: response.rows,
    });
  } catch (err) {
    res.send({ "error": err.message });
  }
}

async function GetArticle(req, res) {
  try {
    const response = await Article.findByPk(req.params.id, {
      ...(req.query.expand) && { include: req.query.expand },
    });
    res.send(response ?? {"message":"Article Does Not Exists"})
  } catch (err) {
    res.send({ "error": err.message });
  }
}

async function DeleteArticle(req, res) {
  try {
    const response = await Article.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (response === 1) {
      res.send({ "message": "Succesfully Deleted Article" });
      return;
    }
    if (response === 0) {
      res.send({ "message": "Article Does Not Exists" });
      return;
    }
  } catch (err) {
    res.send({ "error": err.message });
  }
}

module.exports = ArticleController;
