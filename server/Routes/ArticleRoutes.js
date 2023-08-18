const express = require('express')
const router = express.Router()
const ArticleController = require('../app/Controller/ArticleController')



for(const item of ArticleController)
{
    router[item.method](item.route ?? '/',item.function)
}

module.exports = router